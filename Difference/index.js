var container = document.querySelector('#d3ne');
var _container = document.querySelector('#d3ne_prev');
var toggler = document.querySelector('#toggler');

var active = 1;

toggler.addEventListener('click', toggle);

function toggle() {
    active = (active + 1) % 2;
    
    if (active === 0) {
        toggler.innerText = 'Go to previous version'
        container.className += ' active';
        _container.className = _container.className.replace('active', '');
    }
    else {
        toggler.innerText = 'Go to current version'
        _container.className += ' active';
        container.className = container.className.replace('active', '');
    }
}
toggle();

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

editor.readOnly = true;
_editor.readOnly = true;

editor.fromJSON(current);
_editor.fromJSON(prev);

var engine = new D3NE.Engine('demo@0.1.0', components);
var _engine = new D3NE.Engine('demo@0.1.0', components);

engine.process(current, null, editor);
_engine.process(prev, null, _editor);

var updateView = t => {
    editor.view.scale(t.k);
    editor.view.translate(t.x, t.y);
    _editor.view.scale(t.k);
    _editor.view.translate(t.x, t.y);
};

editor.eventListener.on('transform', updateView);
_editor.eventListener.on('transform', updateView);
editor.eventListener.trigger('change');
    
editor.view.zoomAt(editor.nodes);
editor.view.resize();
_editor.view.resize();
updateView(editor.view.transform);

var COLOR = {
    removed: 'red',
    moved: 'blue',
    added: '#8c2',
    datachanged: '#ee4'
}
var boxShadow = (color) => {
    return new Array(3).fill('0 0 25px ' + color).join(', ');
}

var d = new D3NE.Diff(prev, current);
var differences = d.compare();

console.log(differences);

differences.moved.map(id => {
    editor.nodes.find(n => n.id === id).el.style.boxShadow = boxShadow(COLOR.moved);
});

differences.removed.map(id => {
    _editor.nodes.find(n => n.id === id).el.style.boxShadow = boxShadow(COLOR.removed);
});

differences.added.map(id => {
    editor.nodes.find(n => n.id === id).el.style.boxShadow = boxShadow(COLOR.added);
});

differences.datachanged.map(id => {
    editor.nodes.find(n => n.id === id).el.style.boxShadow = boxShadow(COLOR.datachanged);
});