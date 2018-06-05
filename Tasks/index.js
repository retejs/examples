var container = document.querySelector('#rete')

var editor = new Rete.NodeEditor('tasksample@0.1.0', container);
editor.use(ConnectionPlugin, { curvature: 0.4 });
editor.use(AlightRenderPlugin);
editor.use(ContextMenuPlugin);
editor.use(TaskPlugin);

var engine = new Rete.Engine('tasksample@0.1.0');

[new KeydownComp(), new EnterPressComp(), new AlertComp()].map(c => {
    editor.register(c);
    engine.register(c);
});

editor.on('process connectioncreate connectionremove nodecreate noderemove', async ()=>{
    if(editor.silent) return;
    await engine.abort();
    await engine.process(editor.toJSON());
});

editor.view.resize();

editor.fromJSON(data).then(() => editor.trigger('process'));
