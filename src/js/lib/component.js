/* eslint-disable no-prototype-builtins */

import Store from '../store/store';

export default class Component {
  constructor(props = {}) {
    const self = this;

    this.render = this.render || (() => {});

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }
}
