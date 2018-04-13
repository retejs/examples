import {
  Component, AfterViewInit,
  OnChanges, ViewChild,
  ElementRef, Input, ViewEncapsulation
} from '@angular/core';

import * as D3NE from 'd3-node-editor';
import { NumberControl } from './number-control';
import { InputControl } from './input-control';

@Component({
    selector: 'app-d3ne',
    template: '<div class="wrapper"><div #d3neEditor class="node-editor"></div></div>',
    styleUrls: ['./d3ne.component.css', '../../../node_modules/d3-node-editor/build/d3-node-editor.css'],
  encapsulation: ViewEncapsulation.None
})

export class D3NEComponent implements AfterViewInit {

  @ViewChild('d3neEditor') el: ElementRef;
  editor = null;

    ngAfterViewInit() {
        const numSocket = new D3NE.Socket('number', 'Number value', 'hint');
        const self = this;

        const componentNum = new D3NE.Component('Number', {
           builder(node) {
             const out1 = new D3NE.Output('Number', numSocket);
             const numControl = new InputControl(() => self.editor);

              return node.addControl(numControl).addOutput(out1);
           },
           worker(node, inputs, outputs) {
              outputs[0] = node.data.num;
           }
        });

        const componentAdd = new D3NE.Component('Add', {
           builder(node) {
            const inp1 = new D3NE.Input('Number', numSocket);
            const inp2 = new D3NE.Input('Number', numSocket);
            const out = new D3NE.Output('Number', numSocket);

             const numControl = new NumberControl();

              return node
                 .addInput(inp1)
                 .addInput(inp2)
                 .addControl(numControl)
                 .addOutput(out);
           },
           worker(node, inputs, outputs) {
            const sum = inputs[0][0] + inputs[1][0];
            const numControl: NumberControl = self.editor.nodes.find(n => n.id === node.id).controls[0];
            numControl.setValue(sum);
            outputs[0] = sum;
           }
        });

        const menu = new D3NE.ContextMenu({
           Values: {
              Value: componentNum,
              Action: function() {
                 alert('ok');
              }
           },
           Add: componentAdd
        });

        const container = this.el.nativeElement;

        const components = [componentNum, componentAdd];
        this.editor = new D3NE.NodeEditor('demo@0.1.0', container, components, menu);

        const nn = componentNum.newNode();
        nn.data.num = 2;
        const n1 = componentNum.builder(nn);
        const n2 = componentNum.builder(componentNum.newNode());
        const add = componentAdd.builder(componentAdd.newNode());

        n1.position = [80, 200];
        n2.position = [80, 400];
        add.position = [500, 240];


        this.editor.connect(n1.outputs[0], add.inputs[0]);
        this.editor.connect(n2.outputs[0], add.inputs[1]);

        this.editor.addNode(n1);
        this.editor.addNode(n2);
        this.editor.addNode(add);
        //  this.editor.selectNode(tnode);

        const engine = new D3NE.Engine('demo@0.1.0', components);

        this.editor.eventListener.on('change', async () => {
           await engine.abort();
           await engine.process(this.editor.toJSON());
        });

        this.editor.view.zoomAt(this.editor.nodes);
        this.editor.eventListener.trigger('change');
        this.editor.view.resize();

}

}
