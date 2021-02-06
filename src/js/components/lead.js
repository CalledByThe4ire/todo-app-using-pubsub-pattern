/* eslint-disable indent */

import Component from '../lib/component';
import store from '../store/index';

export default class Lead extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.js-lead'),
    });
  }

  render() {
    const self = this;

    const {
      state: { items },
    } = store;
    const activeItems = items.filter((item) => !item.isDone);
    const doneItems = items.filter((item) => item.isDone);

    if (items.length === 0) {
      self.element.classList.add('is-hidden');
    } else {
      self.element.classList.remove('is-hidden');

      self.element
        .querySelectorAll('.lead-header-app__accent')
        .forEach((accent) => {
          const [clsName] = Object.values(accent.classList).filter((cls) => cls.includes('--'));
          const [, modifier] = clsName.split('--');

          switch (modifier) {
            case 'active':
              accent.textContent = activeItems.length;
              break;
            case 'done':
              accent.textContent = doneItems.length;
              break;
            default:
              throw new Error(`Unknown modifier: ${modifier}`);
          }
        });
    }
  }
}
