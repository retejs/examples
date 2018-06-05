var actionSocket = new Rete.Socket('Action');
var dataSocket = new Rete.Socket('Data');

var eventHandlers = {
    list: [],
    remove() {
        this
            .list
            .forEach(h => {
                document.removeEventListener('keydown', h);
            });
        this.list = [];
    },
    add(name, h) {
        document.addEventListener(name, h, false);
        this
            .list
            .push(h);
    }
};

class KeydownComp extends Rete.Component {

    constructor() {
        super('Keydown event');
        this.task = {
            outputs: ['option', 'output'],
            init: this.init
        }
    }

    init(task) {
        eventHandlers.remove();
        eventHandlers.add('keydown', function (e) {
            task.run(e.keyCode);
            task.reset();
        });
    }

    builder(node) {

        node.addOutput(new Rete.Output('', actionSocket));
        node.addOutput(new Rete.Output('Key code', dataSocket));
    }

    worker(node, inputs, data) {
        console.log('Keydown event', node.id, data);
        return [data]
    }
}

class EnterPressComp extends Rete.Component {

    constructor() {
        super('Enter pressed')
        this.task = {
            outputs: ['option', 'option']
        }
    }

    builder(node) {
        node.addInput(new Rete.Input('', actionSocket))
        node.addInput(new Rete.Input('Key code', dataSocket))
        node.addOutput(new Rete.Output('Tren', actionSocket))
        node.addOutput(new Rete.Output('Else', actionSocket));
    }

    worker(node, inputs) {
        if (inputs[0][0] == 13)
            this.closed = [1];
        else
            this.closed = [0];
        console.log('Print', node.id, inputs);
    }
}



class MessageControl extends Rete.Control {

    constructor(emitter, msg) {
        super();
        this.emitter = emitter;
        this.template = '<input :value="msg" @input="change($event)"/>';

        this.scope = {
            msg,
            change: this.change.bind(this)
        };
    }

    change(e) {
        this.scope.value = +e.target.value;
        this.update();
    }

    update() {
        this.putData('msg', this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData('msg') || 0;
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}


class AlertComp extends Rete.Component {

    constructor() {
        super('Alert');
        this.task = {
            outputs: []
        }
    }

    builder(node) {
        var ctrl = new MessageControl(this.editor, node.data.msg);

        node.addControl(ctrl)
        node.addInput(new Rete.Input('ff', actionSocket));
    }

    worker(node, inputs) {
        console.log('Alert', node.id, node.data);
        alert(node.data.msg);
    }
};