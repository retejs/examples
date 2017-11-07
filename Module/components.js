var moduleManager = new ModuleManager(['Input'], ['Output']);

function _createFieldControl(type, value, key, placeholder = '') {
    return new D3NE.Control(
        '<input type="' +
            type +
            '" value="' +
            value +
            '" placeholder="' +
            placeholder +
            '">',
        (el, c) => {
            function upd() {
                if (type === 'number')
                    c.putData(key, parseFloat(el.value) || 0);
                else c.putData(key, el.value);
                editor.eventListener.trigger('change');
            }

            el.addEventListener('input', upd);
            el.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            }); // prevent node movement when selecting text in the input field
            el.addEventListener('contextmenu', function(e) {
                e.stopPropagation();
            }); // prevent custom context menu
            upd();
        }
    );
}

var numSocket = new D3NE.Socket('number', 'Number value', 'hint');

var componentModule = new D3NE.Component('Module', {
    builder: function(node) {
        if (!node.data.module)
            node.data.module = {
                name: 'module',
                data: {
                    id: editor.id,
                    nodes: {}
                }
            };

        moduleManager.getInputs(node.data.module.data).forEach(i => {
            if (i.title == 'Input')
                node.addInput(new D3NE.Input(i.name, numSocket));
            /// else for another socket
        });

        moduleManager.getOutputs(node.data.module.data).forEach(o => {
            node.addOutput(new D3NE.Output(o.name, numSocket));
        });

        var ctrl = new D3NE.Control(
            '<div class="module-control"><input readonly type="text"><button>Edit</button></d' +
                'iv>',
            (el, c) => {
                el.querySelector('input').value = node.data.module.name;
                el.querySelector('button').onmousedown = () => {
                    openModule(node.data.module);
                };
            }
        );

        node.addControl(ctrl);
    },
    worker: moduleManager.workerModule.bind(moduleManager)
});

var componentInput = new D3NE.Component('Input', {
    builder: function(node) {
        var name = node.data.name || 'inp';
        var out = new D3NE.Output('Number', numSocket);
        var ctrl = _createFieldControl('text', name, 'name', 'type the name');

        node.addOutput(out).addControl(ctrl);
    },
    worker: moduleManager.workerInputs.bind(moduleManager)
});

var componentOutput = new D3NE.Component('Output', {
    builder: function(node) {
        var name = node.data.name || 'out';
        var inp = new D3NE.Input('Number', numSocket);
        var ctrl = _createFieldControl('text', name, 'name', 'type the name');

        node.addInput(inp).addControl(ctrl);
    },
    worker: moduleManager.workerOutputs.bind(moduleManager)
});

var componentNum = new D3NE.Component('Number', {
    builder: function(node) {
        var out1 = new D3NE.Output('Number', numSocket);
        var numControl = _createFieldControl('number', node.data.num, 'num');

        node.addControl(numControl).addOutput(out1);
    },
    worker: function(node, inputs, outputs) {
        outputs[0] = node.data.num;
    }
});

var componentAdd = new D3NE.Component('Add', {
    builder: function(node) {
        var inp1 = new D3NE.Input('Number', numSocket);
        var inp2 = new D3NE.Input('Number', numSocket);
        var out = new D3NE.Output('Number', numSocket);

        var numControl = new D3NE.Control(
            '<input readonly type="number">',
            (el, control) => {
                control.setValue = val => {
                    el.value = val;
                };
            }
        );

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(numControl)
            .addOutput(out);
    },
    worker: function(node, inputs, outputs, module) {
        var sum = inputs[0][0] + inputs[1][0];

        if (!module)
            editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
        outputs[0] = sum;
    }
});

var menu = new D3NE.ContextMenu({
    Values: {
        Value: componentNum,
        Action: function() {
            alert('ok');
        }
    },
    Modularity: {
        Module: componentModule,
        Input: componentInput,
        Output: componentOutput
    },
    Add: componentAdd
});

var components = [
    componentNum,
    componentAdd,
    componentModule,
    componentInput,
    componentOutput
];
