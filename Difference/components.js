var numSocket = new D3NE.Socket('number', 'Number value', 'hint');

var componentNum = new D3NE.Component('Number', {
    builder: function(node) {
        var out1 = new D3NE.Output('Number', numSocket);
        var numControl = new D3NE.Control(
            '<input type="number" value="1">',
            (el, c) => {
                function upd() {
                    c.putData('num', parseFloat(el.value));
                    editor.eventListener.trigger('change');
                }

                el.addEventListener('input', upd);
                el.addEventListener('mousedown', function(e) {e.stopPropagation()});// prevent node movement when selecting text in the input field

                upd();
            }
        );

        return node.addControl(numControl).addOutput(out1);
    },
    worker: function(node, inputs, outputs) {
        outputs[0] = node.data.num;
    }
});

var componentAdd = new D3NE.Component('Add', {
    builder(node) {
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

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(numControl)
            .addOutput(out);
    },
    worker(node, inputs, outputs) {
        var sum = inputs[0][0] + inputs[1][0];

        editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
        outputs[0] = sum;
    }
});

var components = [componentNum, componentAdd];