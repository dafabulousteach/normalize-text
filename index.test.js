const { combine, remove, checkDoc } = require('./index.js')
describe('Normalizing Input', () => {
    
    test('should combine adjacent lists', () => {
        let obj = {
            type: "document",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", content: "This is a paragraph, with a " },
                        { type: "link", content: "link in it", url: "https://example.com" },
                        { type: "text", content: "." }
                    ]
                },
                {
                    type: "list",
                    children: [
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 1"}]
                        },
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 2"}]
                        },
                    ],
                },
                {
                    type: "list",
                    children: [
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 3"}]
                        },
                    ]
                },
            ]
        }

        let result = {
            type: "document",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", content: "This is a paragraph, with a " },
                        { type: "link", content: "link in it", url: "https://example.com" },
                        { type: "text", content: "." }
                    ]
                },
                {
                    type: "list",
                    children: [
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 1"}]
                        },
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 2"}]
                        },
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "List item 3"}]
                        },
                    ],
                }
            ]
            
        }
        expect(checkDoc(obj)).toEqual(result);
    })

    test('should combine adjacent blockquotes', () => {
        let obj = {
            type: "document",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", content: "This is a paragraph, with a " },
                        { type: "link", content: "link in it", url: "https://example.com" },
                        { type: "text", content: "." }
                    ]
                },
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                { type: "text", content: "This text is quoted." },
                            ]
                        }
                    ]
                },
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                { type: "text", content: "This text is quoted." },
                            ]
                        }
                    ]
                }
            ]
        };
        let result = {
            type: "document",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", content: "This is a paragraph, with a " },
                        { type: "link", content: "link in it", url: "https://example.com" },
                        { type: "text", content: "." }
                    ]
                },
                {
                    type: "blockquote",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                { type: "text", content: "This text is quoted." },
                                { type: "text", content: "This text is quoted." },
                            ]
                        }
                    ]
                }
            ]
        };
        expect(checkDoc(obj)).toEqual(result);

    })
})