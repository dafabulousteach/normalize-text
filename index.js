/** 
 * DONE
 * combining adjacent lists
 * combining adjacent blockquotes
 * removing lists with no items in them
 * TODO
 * removing links with no content (zero-width links)
 * turning URLs in text into links that go to that url
 * render HTML for lists with nested list-items
 * 
 */

// Normalize the docuement object
exports.checkDoc = (obj) => {
    let doc_children = obj.children;
    let newDoc = {
        type: "document",
        children: []
    };

    for(let i = 0; i < doc_children.length; i++){
        // check if there are two lists or two blockquotes adjacent to one another
        if(doc_children[i].type === 'list' || doc_children[i].type === 'blockquote'){
           // check if the child is at the end of the document object
           if(doc_children[i].children.length === 0){
               return newDoc;
           } 
           // check if the child has a link type
           if(doc_children[i].children.type === 'link') {
               if(doc_children[i].children.content === ""){
                return newDoc;
               }
           }
           else 
           // if the child is not at the end of the document object
            if((i+1) !== doc_children.length) {
                for(let j = (i+1); j < doc_children.length; j++){
                    // call combine function to combine adjacent lists or blockquotes
                    newDoc.children.push(this.combine(doc_children[i], doc_children[j]));
                    i++
                }
            }
            else {
                newDoc.children.push(doc_children[i]);
            }
        } 
        else {
            newDoc.children.push(doc_children[i]);
        }
    }
    // return the new object
    return newDoc;
}
exports.combine = (firstList, secondList) => {
    if(secondList.type === 'list'){ 
        firstList.children.push(secondList.children[0]);
        return firstList;
    } else if(secondList.type === "blockquote"){
        firstList.children[0].children.push(secondList.children[0].children[0]);
        return firstList;
    }
    return firstList;
}


exports.renderHtml = (obj) => {
    let email = '';
    let top_tag = '<article class="email">';
    let bottom_tag = '</article>';
    email = top_tag;

    let tags = [
        {
            type: 'paragraph',
            start_tag: '<p>',
            end_tag: '</p>',
            link_start_tag: '<a href=',
            link_middle_tag:'>', 
            link_end_tag: '</a>'
        },
        {
            type: 'list',
            start_tag: '<ol>',
            end_tag: '</ol>',
            list_item_start_tag: '<li>',
            list_item_end_tag: '</li>'
        },
        {
            type: 'blockquote',
            start_tag: '<blockquote>',
            end_tag: '</blockquote>',
            p_start_tag: '<p>',
            p_end_tag: '</p>'
        }
    ]

    let doc_child = obj.children

    for(let i = 0; i < doc_child.length; i++){
        // find the matching tag
        tags.filter((parent) => {
            if(parent.type === doc_child[i].type){
                // apply the parent to the child type
                email += parent.start_tag
                // check if the doc_children have children
                if(doc_child[i].children){
                    // loop through the children
                    for(let j = 0; j < doc_child[i].children.length; j++){
                        // if the child is a link
                        if(doc_child[i].children[j].type === 'link'){
                            // build the link html
                            email += parent.link_start_tag + '"' + doc_child[i].children[j].url + '"'
                            + parent.link_middle_tag + doc_child[i].children[j].content + parent.link_end_tag;
                        } else{
                            email += doc_child[i].children[j].content;
                        }
                    }                
                    email += parent.end_tag
                }
                
            }        
        })        
    }
    
    return email + bottom_tag;

}
