# Electron D3 Node Editor


This is a minimal Electron application using D3 Node editor library.


What you need to install the library in your Electron app:

Install library using npm
```bash
npm install --save d3-node-editor
```
`d3ne.js` - [basic example](https://codepen.io/Ni55aN/pen/jBEKBQ?editors=0010) with dependencies required globally

Add to `.html` page:
```html
<link href="./node_modules/d3-node-editor/build/d3-node-editor.css" rel="stylesheet">
<style>
    .socket.number{
        background: #96b38a;
    }
</style>

<div class="node-editor" id="nodeEditor"></div>
<script>
    var d3ne = require('./d3ne');
    d3ne.createEditor(document.querySelector("#nodeEditor"));
</script>
```

You can learn more about D3NE library in the [repository](https://github.com/Ni55aN/D3-Node-editor).

