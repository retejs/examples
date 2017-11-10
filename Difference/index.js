
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
        Action: function() {
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

editor.removeNode(editor.nodes[1]);

var engine = new D3NE.Engine('demo@0.1.0', components);
var _engine = new D3NE.Engine('demo@0.1.0', components);

engine.process(editor.toJSON(), null, editor);
_engine.process(_editor.toJSON(), null, _editor);

var updateView = t => {
    editor.view.scale(t.k);
    editor.view.translate(t.x, t.y);
    _editor.view.scale(t.k);
    _editor.view.translate(t.x, t.y);
};

editor.eventListener.on('transform', updateView);
_editor.eventListener.on('transform', updateView);
editor.eventListener.trigger('change');

editor.view.resize();
_editor.view.resize();
updateView(editor.view.transform);

var COLOR = {
    removed: 'red',
    moved: 'blue',
    added: '#8c2',
    datachanged: '#cc4'
};
var boxShadow = color => {
    return new Array(2).fill('0 0 80px ' + color).join(', ');
};

function diffExample($scope, el, a, env) {
    var states = $scope.states = [
        { name: 'Data changed', key: 'datachanged', color: COLOR.datachanged, status: 0 },
        { name: 'Position changed', key: 'moved', color: COLOR.moved, status: 0 },
        { name: 'Node added', key: 'added', color: COLOR.added, status: 0 },
        { name: 'Node removed', key: 'removed', color: COLOR.removed, status: 0 }
    ];

    $scope.toggleState = state => {
        state.status = (state.status + 1) % 2;
        $scope.updateEditors();
    };
  
    $scope.landscapeOrientation = true;
    env.watch('landscapeOrientation', function(val) {
        editors.style.flexDirection = val?'row':'column';
        editor.view.resize();
        _editor.view.resize();
        editor.view.zoomAt(editor.nodes);
        updateView(editor.view.transform)
    });

    function updateState(state, node) {

        if (differences.get(state.key).includes(node.id)) {
            if (state.status==1) 
                node.el.style.boxShadow = boxShadow(state.color);
        }
        
    }
  
    $scope.updateEditors = () => {
        differences.compute();

        editor.nodes.forEach(node => {
            node.el.style.boxShadow = '';
            states.forEach(state => {
                updateState(state, node);
            });
        });
    
        _editor.nodes.forEach(node => {
            node.el.style.boxShadow = '';
            states.forEach(state => {
                updateState(state, node);
            });
        });
    };
  
    //$scope.updateEditors();
}