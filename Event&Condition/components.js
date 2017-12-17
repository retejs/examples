var actionSocket = new D3NE.Socket('act', 'Action', 'hint');
var dataSocket = new D3NE.Socket('data', 'Data', 'hint');

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

var keydownComp = new D3NE.Component('Keydown event', {
    builder(node) {

        return node
            .addOutput(new D3NE.Output('', actionSocket))
            .addOutput(new D3NE.Output('Key code', dataSocket));
    },
    worker(node, inputs, outputs) {

        var task = new D3NE.Task(inputs, function (inps, data) {
            console.log('Keydown event', node.id, data);
            return [data]
        });

        eventHandlers.remove();
        eventHandlers.add('keydown', function (e) {
            task.run(e.keyCode);
            task.reset();
        });

        outputs[0] = task.option(0);
        outputs[1] = task.output(0);
    }
});

var enterpressComp = new D3NE.Component('Enter pressed', {
    builder(node) {

        return node
            .addInput(new D3NE.Input('', actionSocket))
            .addInput(new D3NE.Input('Key code', dataSocket))
            .addOutput(new D3NE.Output('Tren', actionSocket))
            .addOutput(new D3NE.Output('Else', actionSocket));
    },
    worker(node, inputs, outputs) {

        var task = new D3NE.Task(inputs, function (inps) {
            if (inps[0][0] == 13) 
                this.closed = [1];
            else 
                this.closed = [0];
            console.log('Print', node.id, inps);
        });

        outputs[0] = task.option(0);
        outputs[1] = task.option(1);
    }
});

var alertComp = new D3NE.Component('Alert', {
    builder(node) {

        var ctrl = new D3NE.Control('<input type="text" value="Message...">', (el, c) => {
            function upd() {
                c.putData('msg', el.value);
            }
            el
                .addEventListener('mousedown', function (e) {
                    e.stopPropagation();
                });
            el.addEventListener('keydown', function (e) {
                e.stopPropagation();
            });
            el.value = c.getData('msg');
            el.addEventListener('change', upd);
            upd();
        });

        return node
            .addControl(ctrl)
            .addInput(new D3NE.Input('', actionSocket));
    },
    worker(node, inputs, outputs) {

        var task = new D3NE.Task(inputs, function () {
            console.log('Alert', node.id, node.data);
            alert(node.data.msg);
        });
    }
});

var components = [keydownComp, enterpressComp, alertComp];