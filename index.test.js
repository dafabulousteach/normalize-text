const { combine, remove, checkDoc, renderHtml } = require('./index.js')
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

    test('should handle block elements that are already properly normalized', () => {
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
                                { type: "text", content: "This text is quoted." },
                            ]
                        }
                    ]
                }
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
        }

        expect(checkDoc(obj)).toEqual(result);
    })

    test('should remove lists with no items in them', () => {
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
                    children: [],
                }
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
                }
            ]
        }
        expect(checkDoc(obj)).toEqual(result);
    })


})

describe('Render HTML', () => {
    test('should render a normalized paragraph into HTML', () => {
        let doc = {
            type: "document",
            children: [
                {
                    type: "paragraph",
                    children: [
                        { type: "text", content: "This is a paragraph, with a" },
                        { type: "link", content: "link in it", url: "https://example.com" },
                        { type: "text", content: "." }
                    ]
                }
            ]
        }
        
        let html = '<article class=\"email\"><p>This is a paragraph, with a<a href="https://example.com">link in it</a>.</p></article>'
        expect(renderHtml(doc)).toEqual(html);
    });

    test('should render a normalized nested list into HTML', () => {
        let doc = {
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
                    type: "list",
                    children: [
                        {
                            type: "list-item",
                            children: [{ type: "text", content: "In a nested list"}]
                        },
                    ],
                },
            ],
        }

        let html = '<article class=\"email\"><ol><li>List item 1</li><li>List item 2</li><ol><li>In a nested list</li></ol></ol></article>';
        expect(renderHtml(doc)).toEqual(html);
    })
})