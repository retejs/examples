var container = document.querySelector('#rete');
var editor = null;
var initialData = () => ({id: 'demo@0.1.0', nodes: {}});
var modules = {
    ...modulesData
}
var currentModule = {};

function addModule() {
    modules['module'+Object.keys(modules).length+'.rete'] = { data: initialData() }
}

async function openModule(name) {
    currentModule.data = editor.toJSON();
    
    currentModule = modules[name];
    await editor.fromJSON(currentModule.data);
}


alight('#modules', { modules, addModule, openModule });


var editor = new Rete.NodeEditor("demo@0.1.0", container);
editor.use(ConnectionPlugin, { curvature: 0.4 });
editor.use(AlightRenderPlugin);
editor.use(ContextMenuPlugin);

var engine = new Rete.Engine("demo@0.1.0");

editor.use(ModulePlugin, { engine, modules });

[new NumComponent, new AddComponent, new InputComponent, new ModuleComponent, new OutputComponent, new OutputFloatComponent].map(c => {
    editor.register(c);
    engine.register(c);
});


editor.on("process connectioncreated connectionremoved", () => {
    requestAnimationFrame(async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
    });
});

editor.view.resize();

openModule('index.rete')