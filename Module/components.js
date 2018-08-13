var numSocket = new Rete.Socket("Number");
var floatSocket = new Rete.Socket("Float");

class TextControl extends Rete.Control {

    constructor(emitter, key, readonly, type = 'text') {
        super();
        this.emitter = emitter;
        this.key = key;
        this.type = type;
        this.template = `<input type="${type}" :readonly="readonly" :value="value" @input="change($event)"/>`;

        this.scope = {
            value: null,
            readonly,
            change: this.change.bind(this)
        };
    }

    onChange() {}

    change(e) {
        this.scope.value = this.type === 'number' ? +e.target.value : e.target.value;
        this.update();
        this.onChange();
    }

    update() {
        if (this.key)
            this.putData(this.key, this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData(this.key) || (this.type === 'number' ? 0 : '...');
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}


class InputComponent extends Rete.Component {

    constructor() {
        super("Input");
        this.module = {
            nodeType: 'input',
            socket: numSocket
        }
    }

    builder(node) {
        var out1 = new Rete.Output('output', "Number", numSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addOutput(out1);
    }
}


class ModuleComponent extends Rete.Component {

    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
    }

    builder(node) {
        var ctrl = new TextControl(this.editor, 'module');
        ctrl.onChange = () => {
            console.log(this)
            this.updateModuleSockets(node);
            node._alight.scan();
        }
        return node.addControl(ctrl);
    }

    change(node, item) {
        node.data.module = item;
        this.editor.trigger('process');
    }
}


class OutputComponent extends Rete.Component {

    constructor() {
        super("Output");
        this.module = {
            nodeType: 'output',
            socket: numSocket
        }
    }

    builder(node) {
        var inp = new Rete.Input('input', "Number", numSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }
}


class OutputFloatComponent extends Rete.Component {

    constructor() {
        super("Float Output");
        this.module = {
            nodeType: 'output',
            socket: floatSocket
        }
    }

    builder(node) {
        var inp = new Rete.Input('float', "Float", floatSocket);
        var ctrl = new TextControl(this.editor, 'name');

        return node.addControl(ctrl).addInput(inp);
    }
}

class NumComponent extends Rete.Component {

    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);
        var ctrl = new TextControl(this.editor, 'num', false, 'number');

        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}


class AddComponent extends Rete.Component {
    constructor() {
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input('num1', "Number", numSocket);
        var inp2 = new Rete.Input('num2', "Number", numSocket);
        var out = new Rete.Output('num', "Number", numSocket);

        inp1.addControl(new TextControl(this.editor, 'num1', false, 'number'))
        inp2.addControl(new TextControl(this.editor, 'num2', false, 'number'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new TextControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs, {
        silent
    } = {}) {
        var n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
        var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
        var sum = n1 + n2;

        if (!silent)
            this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);

        outputs['num'] = sum;
    }

    created(node) {
        console.log('created', node)
    }

    destroyed(node) {
        console.log('destroyed', node)
    }
}