import { Control } from 'd3-node-editor';
import * as template from './number-control.template.html';

export class NumberControl extends Control {

  el: HTMLInputElement;

  constructor() {
    super(<any>template);
  }

  handler = (el: HTMLInputElement) => {
    this.el = el;
  }

  public setValue(val) {
    this.el.value = val;
  }
}
