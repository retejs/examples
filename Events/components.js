var actionSocket = new D3NE.Socket("act", "Action", "hint");
var dataSocket = new D3NE.Socket("data", "Data", "hint");

var Caller = function (act) {

    this.action = act;
    this.next = [];
    this.outputData = null;
    this.run = function () {
        this.outputData = this.action();
        this
            .next
            .forEach(f => f.run());
    }
}

var keydownComp = new D3NE.Component('keydown event', {
    builder: function () {
        return new D3NE
            .Node('Keydown event')
            .addOutput(new D3NE.Output('', actionSocket));
    },
    worker: function (node, inputs, outputs) {

        var caller = new Caller(function () {
            console.log('Keydown event');
        });
        document.addEventListener("keydown", function (e) {
            caller.run();
        }, false);
        outputs[0] = caller;
    }
});

var printComp = new D3NE.Component('print', {
    builder: function () {

        return new D3NE
            .Node('Print')
            .addInput(new D3NE.Input('', actionSocket, true))
            .addInput(new D3NE.Input('Data', dataSocket))
            .addOutput(new D3NE.Output('', actionSocket));
    },
    worker: function (node, inputs, outputs) {
        if (!(inputs[0][0] instanceof Caller))
            return;

        inputs[0].forEach(inp => {
            var caller = new Caller(function () {
                if (inputs[1][0]) {
                    if (!inputs[1][0].outputData)
                        inputs[1][0].run();
                    // console.log(inputs[1][0].outputData);
                }

                console.log('Print');
            });
            inp
                .next
                .push(caller);
            outputs[0] = caller;
        });
    }
});

var dataComp = new D3NE.Component('data', {
    builder: function () {

        return new D3NE
            .Node('Data')
            .addOutput(new D3NE.Output('', dataSocket));
    },
    worker: function (node, inputs, outputs) {

        outputs[0] = new Caller(function () {
            console.log('Data');
            return "all nice";
        });
    }
});

var components = [keydownComp, printComp, dataComp];