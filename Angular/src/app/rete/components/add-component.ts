import { Component, Input, Output } from 'rete';
import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class AddComponent extends Component {
  constructor() {
    super('Add');
  }

  builder(node) {
    const inp1 = new Input('Number', numSocket);
    const inp2 = new Input('Number', numSocket);
    const out = new Output('Number', numSocket);

    inp1.addControl(new NumControl(this.editor, 'num1'));
    inp2.addControl(new NumControl(this.editor, 'num2'));

    node.addInput(inp1)
      .addInput(inp2)
      .addControl(new NumControl(this.editor, null, true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    const n1 = inputs[0].length ? inputs[0][0] : node.data.num1;
    const n2 = inputs[1].length ? inputs[1][0] : node.data.num2;
    const sum = n1 + n2;

    const ctrl = <NumControl>this.editor.nodes.find(n => n.id === node.id).controls[0];
    ctrl.setValue(sum);
    outputs[0] = sum;
  }

  created(node) {
    console.log('created', node);
  }

  destroyed(node) {
    console.log('destroyed', node);
  }
}
