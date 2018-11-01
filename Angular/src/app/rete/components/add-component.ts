import { Component, Input, Output } from 'rete';
import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class AddComponent extends Component {
  constructor() {
    super('Add');
  }

  builder(node) {
    const inp1 = new Input('num1', 'Number', numSocket);
    const inp2 = new Input('num2', 'Number', numSocket);
    const out = new Output('num', 'Number', numSocket);

    inp1.addControl(new NumControl(this.editor, 'num1'));
    inp2.addControl(new NumControl(this.editor, 'num2'));

    node.addInput(inp1)
      .addInput(inp2)
      .addControl(new NumControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    const n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
    const n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
    const sum = n1 + n2;

    const ctrl = <NumControl>this.editor.nodes.find(n => n.id === node.id).controls.get('preview');
    ctrl.setValue(sum);
    outputs['num'] = sum;
  }

  created(node) {
    console.log('created', node);
  }

  destroyed(node) {
    console.log('destroyed', node);
  }
}
