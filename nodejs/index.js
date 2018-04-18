var { Engine, ComponentWorker } = require('d3-node-editor/build/d3-node-editor.engine');

var c1 = new ComponentWorker('component1', {
    worker(node, inputs, outputs) {
        console.log('worker')
        outputs[0] = 1;
    }
});

var engine = new Engine('name@0.0.0', [c1]);

engine.process({
    id: 'name@0.0.0',
    nodes: {
        1: {
            title: 'component1',
            id: 1,
            inputs: [],
            outputs: []
        }
    },
    groups: { }
}).then(console.log)