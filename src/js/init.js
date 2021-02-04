import List from './components/list';
import Lead from './components/lead';

export default (store) => {
  const addItemForm = document.querySelector('.app__add-item');
  const searchForm = document.querySelector('.filter-app__search');
  const filters = document.querySelectorAll('.filter-app__category');

  const listInstance = new List();
  const leadInstance = new Lead();

  listInstance.render();
  leadInstance.render();

  filters.forEach((filter, index, items) => {
    filter.addEventListener('click', (evt) => {
      items.forEach((item) => item.classList.remove('active'));

      const { target } = evt;

      target.classList.add('active');

      store.dispatch('addFilter', {
        filterType: target.textContent.trim().toLowerCase(),
      });
    });
  });

  addItemForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const value = Object.fromEntries(formData)['new-list-item'];

    store.dispatch('addItem', { label: value });

    evt.target.elements['new-list-item'].value = '';
    evt.target.elements['new-list-item'].focus();
  });

  searchForm.elements.search.addEventListener('input', (evt) => {
    store.dispatch('addSearch', { search: evt.target.value.trim() });
  });
};
