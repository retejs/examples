var container = document.querySelector('#d3ne');
var _container = document.querySelector('#d3ne_prev');
var editors = document.querySelector('.editors');
var differences = {
    _d: null,
    compute() {
        var d = new D3NE.Diff(_editor.toJSON(), editor.toJSON());

        this._d = d.compare();
    },
    get(key) {
        return this._d[key];
    }
}

var menu = new D3NE.ContextMenu({
    Values: {
        Value: componentNum,
        Action: function () {
            alert('ok');
        }
    },
    Add: componentAdd
});

var editor = new D3NE.NodeEditor('demo@0.1.0', container, components, menu);
var _editor = new D3NE.NodeEditor('demo@0.1.0', _container, components, menu);

//editor.readOnly = true;
_editor.readOnly = true;

editor.fromJSON(current);
_editor.fromJSON(prev);

var engine = new D3NE.Engine('demo@0.1.0', components);
var _engine = new D3NE.Engine('demo@0.1.0', components);

engine.process(editor.toJSON(), null, editor);
_engine.process(_editor.toJSON(), null, _editor);

var updateView = t => {
    if (d3.event && d3.event.sourceEvent.ctrlKey) return;
    editor.view.scale(t.k);
    editor.view.translate(t.x, t.y);
    _editor.view.scale(t.k);
    _editor.view.translate(t.x, t.y);
};

editor
    .eventListener
    .on('transform', updateView);
_editor
    .eventListener
    .on('transform', updateView);
editor
    .eventListener
    .trigger('change');

editor
    .view
    .resize();
_editor
    .view
    .resize();
updateView(editor.view.transform);

var COLOR = {
    removed: 'red',
    moved: 'blue',
    added: '#8c2',
    datachanged: '#cc4'
};
var boxShadow = color => {
    return new Array(2)
        .fill('0 0 80px ' + color)
        .join(', ');
};

function diffExample($scope, el, a, env) {
    var states = $scope.states = [
        {
            name: 'Data changed',
            key: 'datachanged',
            color: COLOR.datachanged,
            status: 0
        }, {
            name: 'Position changed',
            key: 'moved',
            color: COLOR.moved,
            status: 0
        }, {
            name: 'Node added',
            key: 'added',
            color: COLOR.added,
            status: 0
        }, {
            name: 'Node removed',
            key: 'removed',
            color: COLOR.removed,
            status: 0
        }, {
            name: 'Connections',
            key: 'connections',
            status: 0
        }
    ];

    $scope.toggleState = state => {
        state.status = (state.status + 1) % 2;
        $scope.updateEditors();
    };

    $scope.landscapeOrientation = true;
    env.watch('landscapeOrientation', function (val) {
        editors.style.flexDirection = val
            ? 'row'
            : 'column';
        editor
            .view
            .resize();
        _editor
            .view
            .resize();
        editor
            .view
            .zoomAt(editor.nodes);
        updateView(editor.view.transform)
    });

    function highlightNode(node, state) {
        if (state.status===1 &&differences.get(state.key).includes(node.id))
            node.style.boxShadow = boxShadow(state.color);
    }

    function updateEditorNodes(ed) {
        ed
            .nodes
            .forEach(node => {
                node.style.boxShadow = '';
                highlightNode(node, states[0]);
                highlightNode(node, states[1]);
                highlightNode(node, states[2]);
                highlightNode(node, states[3]);
            });
    }

    function eachConnects(ed, callback) {
        ed
            .nodes
            .forEach(node => {
                var outputNode = node.id;

                node.outputs.forEach((o, i) => {
                    var outputIndex = i;

                    o.connections.forEach(c => {
                        var inputNode = c.input.node.id;
                        var inputIndex = c.input.node.inputs.indexOf(c.input);
                        
                        callback(c, outputNode, outputIndex, inputNode, inputIndex);
                    })
                });
            });
    }

    function updateEditorConnections(ed, target, handle) {
        eachConnects(ed, (c, oNode, oIndex, iNode, iIndex) => {
            
            var diff = differences.get('connects').find(d => d.node === oNode && d.output === oIndex);

            if (diff && diff[target].find(d => d.node === iNode && d.input === iIndex))
                handle(c.style);
            else if (differences.get(target).find(id => id === oNode))
                handle(c.style);
    
        });
    }

    $scope.updateEditors = () => {
        differences.compute();

        updateEditorNodes(editor);
        updateEditorNodes(_editor);

        updateEditorConnections(_editor, 'removed', (s) => {
            if (states[4].status)
                s.stroke = '#f53'
            else
                s.stroke = '';
        });
        updateEditorConnections(editor, 'added', (s) => {
            if (states[4].status)
                s.stroke = '#4f6'
            else
                s.stroke = ''
        });

        editor.view.update();
        _editor.view.update();
    }

    $scope.updateEditors();

}