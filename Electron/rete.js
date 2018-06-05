
const Rete = require('rete');
const AlightRenderPlugin = require('rete-connection-plugin');
const ConnectionPlugin = require('rete-alight-render-plugin');

var numSocket = new Rete.Socket('Number value');

class NumControl extends Rete.Control {

    constructor(emitter, key, readonly) {
        super();
        this.emitter = emitter;
        this.key = key;
        this.template = '<input type="number" :readonly="readonly" :value="value" @input="change($event)"/>';

       this.scope = {
            value: 0,
            readonly,
            change: this.change.bind(this)
        };
    }

    change(e){
        this.scope.value = +e.target.value;
        this.update();
    }

    update(){
        if(this.key)
            this.putData(this.key, this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData(this.key) || 0;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}

class NumComponent extends Rete.Component {

    constructor(){
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output("Number", numSocket);

        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs[0] = node.data.num;
    }
}


class AddComponent extends Rete.Component {
    constructor(){
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input("Number", numSocket);
        var inp2 = new Rete.Input("Number", numSocket);
        var out = new Rete.Output("Number", numSocket);

        inp1.addControl(new NumControl(this.editor, 'num1'))
        inp2.addControl(new NumControl(this.editor, 'num2'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, null, true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs[0].length?inputs[0][0]:node.data.num1;
        var n2 = inputs[1].length?inputs[1][0]:node.data.num2;
        var sum = n1 + n2;
        
        this.editor.nodes.find(n => n.id == node.id).controls[0].setValue(sum);
        outputs[0] = sum;
    }
}

exports.createEditor = async (container) => {

    var components = [new NumComponent(), new AddComponent()];
    
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin, { curvature: 0.4 });
    editor.use(AlightRenderPlugin);

    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    var n1 = await components[0].createNode({num: 2});
    var n2 = await components[0].createNode({num: 0});
    var add = await components[1].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(n1.outputs[0], add.inputs[0]);
    editor.connect(n2.outputs[0], add.inputs[1]);


    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });

    editor.view.resize();
    editor.trigger('process');
}