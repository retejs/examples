var actionSocket = new D3NE.Socket("act", "Action", "hint");
var dataSocket = new D3NE.Socket("data", "Data", "hint");

class Caller {

    constructor(inputs, action) {

        this.inputs = inputs;
        this.action = action;
        this.next = [];
        this.outputData = null;

        this
            .inputs
            .filter(input => input[0]instanceof Caller)
            .forEach(input => {
                input.forEach(inputCons => {
                    inputCons
                        .next
                        .push(this);
                })
            });
    }

    reset() {
        this.outputData = null;
    }

    run() {
        var inputs = this
            .inputs
            .filter(input => !(input[0]instanceof Caller))
            .map(input => {
                if (input[0]) {
                    input[0].run();
                    return input[0].get();
                }
            });

        if (!this.outputData) {
            this.outputData = this.action(inputs);
            this
                .next
                .forEach(f => f.run());
        }
    }

    applyOutput(index) {
        var caller = this;
        return {
            run: caller
                .run
                .bind(caller),
            get() {
                return caller.outputData[index];
            }
        }
    }
}

var keydownComp = new D3NE.Component('keydown event', {
    builder: function () {
        return new D3NE
            .Node('Keydown event')
            .addOutput(new D3NE.Output('', actionSocket))
            .addOutput(new D3NE.Output('Data', dataSocket));
    },
    worker: function (node, inputs, outputs) {

        var caller = new Caller(inputs, function () {
            console.log('Keydown event', node.id);
            return []
        });

        document.addEventListener("keydown", function (e) {
            caller.run();
            caller.reset();
        }, false);

        outputs[0] = caller;
        outputs[1] = caller.applyOutput(0);
    }
});

var printComp = new D3NE.Component('print', {
    builder: function () {

        return new D3NE
            .Node('Print')
            .addInput(new D3NE.Input('', actionSocket))
            .addInput(new D3NE.Input('Data', dataSocket))
            .addOutput(new D3NE.Output('', actionSocket));
    },
    worker: function (node, inputs, outputs) {
        if (!(inputs[0][0]instanceof Caller)) 
            return;
        
        var caller = new Caller(inputs, function (inps) {

            console.log('Print', node.id, inps);
        });
        outputs[0] = caller;
    }
});

var dataComp = new D3NE.Component('data', {
    builder: function () {

        return new D3NE
            .Node('Data')
            .addInput(new D3NE.Input('', dataSocket))
            .addOutput(new D3NE.Output('', dataSocket))
            .addOutput(new D3NE.Output('', dataSocket));
    },
    worker: function (node, inputs, outputs) {
        var caller = new Caller(inputs, function (inps) {

            console.log('Data', node.id, inps);
            return ["first", "second"];
        });
        outputs[0] = caller.applyOutput(0);
        outputs[1] = caller.applyOutput(1);
    }
});

var components = [keydownComp, printComp, dataComp];