/* eslint-disable indent */

import classNames from 'classnames';
import Component from '../lib/component';
import store from '../store/index';

export default class List extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.js-list'),
    });
  }

  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.isDone);
      case 'done':
        return items.filter((item) => item.isDone);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(
      (item) => item.label.toLowerCase().indexOf(search.toLowerCase()) > -1,
    );
  }

  render() {
    const self = this;

    const visibleItems = this.searchItems(
      this.filterItems(store.state.items, store.state.filter),
      store.state.search,
    );

    if (store.state.isLoading) {
      self.element.innerHTML = `
        <div class="spinner-border" role="status"></div>`;
    } else if (visibleItems.length === 0) {
      self.element.innerHTML = `
        <div class="${classNames(
          'todo-list-app__alert',
          'alert',
          'alert-light',
          'm-0',
          'p-0',
        )}" role="alert">
          You've done nothing yet.
        </div>`;
    } else {
      self.element.innerHTML = `
        <ul class="${classNames(
          'todo-list-app__items',
          'mb-3',
          'list-group',
          'd-flex',
          'justify-content-between',
          'align-items-start',
          'flex-grow-1',
        )}">
          ${visibleItems
            .map(
              (item) => `
                <li class="${classNames(
                  'list-group-item',
                  'list-group-item-action',
                  'd-flex',
                  'justify-content-between',
                  'align-items-center',
                  'todo-list-app__item',
                )}"
                    data-id=${item.id}
                    data-action-type="toggle"
                    style="cursor: pointer;"
                >
                    <p class="${classNames(
                      {
                        'is-done': item.isDone,
                        'is-important': item.isImportant,
                      },
                      'todo-list-app__text',
                      'p-0',
                      'm-0',
                    )}"
                    style="pointer-events: none;"
                    >
                    ${item.label}
                    </p>
                    <div class="btn-group">
                    <button class="${classNames(
                      'btn',
                      'btn-outline-secondary',
                      { disabled: store.state.isLoading },
                    )}" data-action-type="remove"
                        style="pointer: ${store.state.isLoading ? 'not-allowed' : 'cursor'};">
                        <i class="${classNames(
                          'fa',
                          'fa-trash',
                          { 'd-none': store.state.isLoading },
                        )}" style="pointer-events: none;"></i>
                    </button>
                        <button class="${classNames(
                          'btn',
                          'btn-outline-secondary',
                        )}" data-action-type="toggle"
                            style="pointer: ${store.state.isLoading ? 'not-allowed' : 'cursor'};">
                            <i class="${classNames(
                              'fa',
                              'fa-exclamation-circle',
                            )}" style="pointer-events: none;"></i>
                        </button>
                    </div>
                </li>
              `,
            )
            .join('')}
        </ul>`;
    }

    self.element.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', (evt) => {
        evt.preventDefault();

        const {
          target: {
            dataset: { actionType },
            tagName,
          },
          currentTarget: {
            dataset: { id },
          },
        } = evt;

        switch (tagName.toLowerCase()) {
          case 'li':
            store.dispatch('updateItem', {
              id,
              propName: 'isDone',
            });
            break;
          case 'button':
            actionType === 'remove'
              ? store.dispatch('removeItem', { id })
              : store.dispatch('updateItem', { id, propName: 'isImportant' });
            break;
          default:
            break;
        }
      });
    });
  }
}
