var actionSocket = new D3NE.Socket("act", "Action", "hint");
var dataSocket = new D3NE.Socket("data", "Data", "hint");

var Caller = function (workerInputs, act) {

    this.action = act;
    this.next = [];
    this.outputData = null;
    this.run = function () {
        //this.prev.forEach(f => f.run());

        var inputs = workerInputs.map(inp => {
            if (inp[0] && inp[0]instanceof CallerOut) {
                inp[0].run();
                return inp[0].get();
            }
        });

        if (!this.outputData) {
            this.outputData = this.action(inputs);
            this
                .next
                .forEach(f => f.run());
        }
    }
}

var CallerOut = function (index, caller) {
    this.run = function () {
        caller.run();
    }
    this.get = function () {
        return caller.outputData[index];
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
            return ['event data']
        });
        document.addEventListener("keydown", function (e) {
            caller.run();
        }, false);
        outputs[0] = caller;
        outputs[1] = new CallerOut(0, caller);
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
            if (inputs[1][0]) {

                inputs[1][0].run();
                console.log(inputs[1][0].get());
            }

            console.log('Print', node.id, inps);
        });

        inputs[0][0]
            .next
            .push(caller);
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
            return ["all nice", "second"];
        });
        outputs[0] = new CallerOut(0, caller);
        outputs[1] = new CallerOut(1, caller);
    }
});

var components = [keydownComp, printComp, dataComp];