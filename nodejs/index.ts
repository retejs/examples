import  { Engine, Component } from 'rete';

class Comp extends Component {
    constructor() {
        super('component1');
    }

    async builder() {}

    worker(node, inputs, outputs) {
        console.log('worker')
        outputs[0] = 1;
    }
}

var engine = new Engine('name@0.0.0');
engine.register(new Comp());

engine.process({
    id: 'name@0.0.0',
    nodes: {
        1: {
            name: 'component1',
            id: 1,
            inputs: {},
            outputs: {},
            data: {},
            position: [0, 0]
        }
    }
}).then(console.log)
