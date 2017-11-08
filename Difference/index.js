var container = document.querySelector('#d3ne');
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

var engine = new D3NE.Engine('demo@0.1.0', components);

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