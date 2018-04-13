import { Control } from 'd3-node-editor';


export class NumberControl extends Control {

  el: HTMLInputElement;

  constructor() {
    super('<input readonly type="number">', NumberControl.handler);
  }

  static handler(el: HTMLInputElement, control: NumberControl) {
    control.el = el;
  }

  public setValue(val) {
    this.el.value = val;
  }
}
