var actionSocket = new D3NE.Socket("act", "Action", "hint");
var dataSocket = new D3NE.Socket("data", "Data", "hint");

class Task {

    constructor(inputs, action) {
        this.inputs = inputs;
        this.action = action;
        this.next = [];
        this.outputData = null;
        this.closed = [];

        this
            .getOptions()
            .forEach(input => {
                input.forEach(con => {
                    con
                        .task
                        .next
                        .push({index: con.index, task: this});
                })
            });
    }

    getOptions() {
        return this
            .inputs
            .filter(input => input[0] && input[0].task)
    }

    getOutputs() {
        return this
            .inputs
            .filter(input => input[0] && input[0].get);
    }

    reset() {
        this.outputData = null;
    }

    run(data) {
        var inputs = this
            .getOutputs()
            .map(input => {
                return input.map(con => {
                    if (con) {
                        con.run();
                        return con.get();
                    }
                })
            });

        if (!this.outputData) {
            this.outputData = this.action(inputs, data);

            this
                .next
                .filter(f => !this.closed.includes(f.index))
                .forEach(f => f.task.run());
        }
    }

    option(index) {
        var task = this;
        return {task, index}
    }

    output(index) {
        var task = this;
        return {
            run: task
                .run
                .bind(task),
            get() {
                return task.outputData[index];
            }
        }
    }
}

var eventHandlers = {
    list: [],
    remove() {
        this
            .list
            .forEach(h => {
                document.removeEventListener("keydown", h);
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

var keydownComp = new D3NE.Component('keydown event', {
    builder: function () {

        return new D3NE
            .Node('Keydown event')
            .addOutput(new D3NE.Output('', actionSocket))
            .addOutput(new D3NE.Output('Data', dataSocket));
    },
    worker: function (node, inputs, outputs) {

        var task = new Task(inputs, function (inps, data) {
            console.log('Keydown event', node.id, data);
            return ['event data']
        });
        eventHandlers.remove();
        eventHandlers.add("keydown", function (e) {
            task.run(e.keyCode);
            task.reset();
        });

        outputs[0] = task.option(0);
        outputs[1] = task.output(0);
    }
});

var printComp = new D3NE.Component('print', {
    builder: function () {

        return new D3NE
            .Node('Print')
            .addInput(new D3NE.Input('', actionSocket))
            .addInput(new D3NE.Input('Data', dataSocket))
            .addOutput(new D3NE.Output('', actionSocket))
            .addOutput(new D3NE.Output('', actionSocket));
    },
    worker: function (node, inputs, outputs) {

        var task = new Task(inputs, function (inps) {
            this.closed = [0];
            console.log('Print', node.id, inps);
        });
        outputs[0] = task.option(0);
        outputs[1] = task.option(1);
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

        var task = new Task(inputs, function (inps) {

            console.log('Data', node.id, inps);
            return ["first", "second"];
        });
        outputs[0] = task.output(0);
        outputs[1] = task.output(1);
    }
});

var components = [keydownComp, printComp, dataComp];