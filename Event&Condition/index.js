var container = document.querySelector('#d3ne')

var menu = new D3NE.ContextMenu({
    'Alert': alertComp,
    //
    'Enter pressed': enterpressComp,
    //
    'Keydown': keydownComp
});

var editor = new D3NE.NodeEditor('glslsample@0.1.0', container, components, menu);

editor.eventListener.on('connectioncreate connectionremove nodecreate noderemove', (_, p)=>{
    if (p)
        compile();
});

var engine = new D3NE.Engine('glslsample@0.1.0', components);

async function compile() {
    await engine.abort();
    var status = await engine.process(editor.toJSON());
}

function getNode(id) {
    return editor
        .nodes
        .find(n => n.id == id);
}

editor.fromJSON(data).then(() => {
    
    editor.view.resize();
    editor.view.zoomAt(editor.nodes);
    compile();
});
