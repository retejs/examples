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
                }, {
                    "connections": []
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
                    "connections": []
                }
            ],
            "outputs": [
                {
                    "connections": [
                        {
                            "node": 8,
                            "input": 0
                        }
                    ]
                }
            ],
            "position": [
                443, 112
            ],
            "title": "Print"
        },
        "8": {
            "id": 8,
            "data": {},
            "group": null,
            "inputs": [
                {
                    "connections": [
                        {
                            "node": 3,
                            "output": 0
                        }
                    ]
                }, {
                    "connections": []
                }
            ],
            "outputs": [
                {
                    "connections": []
                }
            ],
            "position": [
                761, 116
            ],
            "title": "Print"
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
