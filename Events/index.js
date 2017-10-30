var container = document.querySelector("#d3ne")

var menu = new D3NE.ContextMenu({
    'Data': dataComp.builder,
    //
    'Print': printComp.builder,
    //
    'Keydown': keydownComp.builder
});

var editor = new D3NE.NodeEditor('glslsample@0.1.0', container, components, menu);

editor.fromJSON({
    "id": "glslsample@0.1.0",
    "nodes": {
        "2": {
            "id": 2,
            "data": {},
            "group": null,
            "inputs": [],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 3,
                            "input": 0
                        }
                    ]
                }
            ],
            "position": [
                114, 133
            ],
            "title": "Keydown event"
        },
        "3": {
            "id": 3,
            "data": {},
            "group": null,
            "inputs": [
                {
                    "connections": [
                        {
                            "node": 2,
                            "output": 0
                        }
                    ]
                }, {
                    "connections": [
                        {
                            "node": 6,
                            "output": 0
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "connections": []
                }
            ],
            "position": [
                526, 123
            ],
            "title": "Print"
        },
        "4": {
            "id": 4,
            "data": {},
            "group": null,
            "inputs": [
                {
                    "connections": [
                        {
                            "node": 5,
                            "output": 0
                        }
                    ]
                }, {
                    "connections": [
                        {
                            "node": 6,
                            "output": 1
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "connections": []
                }
            ],
            "position": [
                499, 362
            ],
            "title": "Print"
        },
        "5": {
            "id": 5,
            "data": {},
            "group": null,
            "inputs": [],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 4,
                            "input": 0
                        }
                    ]
                }
            ],
            "position": [
                98, 462
            ],
            "title": "Keydown event"
        },
        "6": {
            "id": 6,
            "data": {},
            "group": null,
            "inputs": [
                {
                    "connections": [
                        {
                            "node": 7,
                            "output": 0
                        }
                    ]
                }
            ],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 3,
                            "input": 1
                        }
                    ]
                }, {
                    "connections": [
                        {
                            "node": 4,
                            "input": 1
                        }
                    ]
                }
            ],
            "position": [
                173, 262
            ],
            "title": "Data"
        },
        "7": {
            "id": 7,
            "data": {},
            "group": null,
            "inputs": [
                {
                    "connections": []
                }
            ],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 6,
                            "input": 0
                        }
                    ]
                }, {
                    "connections": []
                }
            ],
            "position": [
                -85, 263
            ],
            "title": "Data"
        }
    },
    "groups": {}
});

var engine = new D3NE.Engine('glslsample@0.1.0', components);

async function compile() {
    await engine.abort();
    var status = await engine.process(editor.toJSON());
}

function getNode(id) {
    return editor
        .nodes
        .find(n => n.id == id);
}

var overr = editor.view.getTemplate;

editor.view.getTemplate = function (node) {
    return '<id>{{node.id}}</id>' + overr.call(editor.view, node);
}
