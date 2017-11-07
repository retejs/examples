var container = document.querySelector('#d3ne');
var editor = null;

var header = document.querySelector('#moduleheader');
var modulename = header.querySelector('input');

modulename.addEventListener('input', () => {
    moduleStackEditor[moduleStackEditor.length - 1].module.name = modulename.value;
});

var moduleStackEditor = [];

function saveModule() {
    var { module, data } = moduleStackEditor.pop();

    module.data = editor.toJSON();
    editor.fromJSON(data);
    editor.view.zoomAt(editor.nodes);
    if (moduleStackEditor.length === 0) 
        header.style.display = 'none';
    else
        modulename.value = moduleStackEditor[moduleStackEditor.length-1].module.name;
    
    editor
        .eventListener
        .trigger('change');
}

function openModule(m) {
    moduleStackEditor.push({
        data: editor.toJSON(),
        module: m
    });
    header.style.display = 'inline';
    modulename.value = m.name;
    editor.fromJSON(m.data);
    editor.view.zoomAt(editor.nodes);
    editor.eventListener.trigger('change');
}

editor = new D3NE.NodeEditor('demo@0.1.0', container, components, menu);

var engine = new D3NE.Engine('demo@0.1.0', components);

moduleManager.setEngine(engine);

editor.fromJSON(data);

editor
    .eventListener
    .on('change', async function (_, persistent) {
        if (persistent) {
            await engine.abort();
            await engine.process(editor.toJSON());
        }
    });

editor.view.zoomAt(editor.nodes);
editor.eventListener.trigger('change');
editor.view.resize();
