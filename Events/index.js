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
                152, 157
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
                459, 354
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
                111, 391
            ],
            "title": "Keydown event"
        },
        "6": {
            "id": 6,
            "data": {},
            "group": null,
            "inputs": [],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 3,
                            "input": 1
                        }, {
                            "node": 4,
                            "input": 1
                        }
                    ]
                }
            ],
            "position": [
                202, 264
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
