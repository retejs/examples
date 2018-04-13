import {Control, NodeEditor} from 'd3-node-editor';

export class InputControl extends Control {

  el: HTMLInputElement;

  constructor(private editor: () => NodeEditor) {
    super('<input type="number">', InputControl.handler);
  }

  static handler(el: HTMLInputElement, control: InputControl) {
    control.el = el;
    el.value = control.getData('num') || 1;

    el.addEventListener('input', () => {
      control.update();
      control.editor().eventListener.trigger('change');
    });
    el.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
    // prevent node movement when selecting text in the input field
    control.update();
  }

  update() {
    this.putData('num', parseFloat(this.el.value));
  }
}
