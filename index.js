/** 
 * combining adjacent lists (as above)
 * combining adjacent blockquotes
 * removing lists with no items in them
 * removing links with no content (zero-width links)
 * turning URLs in text into links that go to that url
 */

// document check function
exports.checkDoc = (obj) => {
    let doc_children = obj.children;
    let newDoc = {
        type: "document",
        children: []
    };

    for(let i = 0; i < doc_children.length; i++){
        // if I see two lists in a row, call combineList and combineBlockQuote on that index
        if(doc_children[i].type === 'list'){
            for(let j = i+1; j < doc_children.length; j++){
                if(doc_children[j].type === 'list'){
                    newDoc.children.push(this.combineList(doc_children[i], doc_children[j].children))
                }
            }
        } else {
            newDoc.children.push(doc_children[i]);
        }
    }
    // return the new object
    return newDoc;
    // call renderHTML

}
exports.combineList = (firstList, secondList) => {
    // first loop goes to through the documents children
    for(let i = 0; i < secondList.length; i++){
        // add the child to new object [list-item or the paragraph]
        firstList.children.push(secondList[i]);
    }
    return firstList;
}

exports.combineBlocks = () => {

}

exports.remove = () => {

}

exports.renderHtml = () => {

}
