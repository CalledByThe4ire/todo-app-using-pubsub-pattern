/* eslint-disable indent */

import classNames from 'classnames';
import Component from '../lib/component';
import store from '../store/index';

export default class AddItem extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.js-add-item'),
    });
  }

  render() {
    const self = this;

    const {
      state: { isLoading },
    } = store;

    self.element.innerHTML = `
    <form class="app__add-item add-item-app">
        <div class="input-group">
            <input
                class="add-item-app__input form-control d-flex flex-grow-1 border-secondary"
                name="new-list-item"
                type="text"
                placeholder="What needs to be done?"
                autocomplete="off"
            />
            <div class="input-group-append">
                <button
                    class="${classNames(
                      'add-item-app__submit',
                      'btn',
                      'btn-outline-secondary',
                      { disabled: isLoading },
                    )}"
                    type="submit"
                    style="pointer: ${isLoading ? 'not-allowed' : 'cursor'};">
                    Add
                </button>
            </div>
        </div>
    </form>
    `;

    const addItemForm = document.querySelector('.app__add-item');

    addItemForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formData = new FormData(evt.target);

      const value = Object.fromEntries(formData)['new-list-item'].trim();

      if (value.length !== 0) {
        store.dispatch('addItem', { label: value });
      }

      evt.target.elements['new-list-item'].value = '';
      evt.target.elements['new-list-item'].focus();
    });
  }
}
