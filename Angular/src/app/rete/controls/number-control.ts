import { Control } from 'rete';
import * as template from './number-control.template.html';

export class NumControl extends Control {

  template: any = template;
  scope = {
    value: 0,
    readonly: false,
    change: this.change.bind(this)
  };
  _alight: any;

  constructor(public emitter, public key, readonly = false) {
    super();

    this.scope.readonly = readonly;
  }

  change(e) {
    this.scope.value = +e.target.value;
    this.update();
  }

  update() {
    if (this.key) {
      this.putData(this.key, this.scope.value);
    }
    this.emitter.trigger('process');
    this._alight.scan();
  }

  mounted() {
    this.scope.value = this.getData(this.key) || 0;
    this.update();
  }

  setValue(val) {
    this.scope.value = val;
    this._alight.scan();
  }
}
