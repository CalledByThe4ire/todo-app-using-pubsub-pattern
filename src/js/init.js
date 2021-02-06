import Lead from './components/lead';
import List from './components/list';
import AddItem from './components/add-item';

export default (store) => {
  document.addEventListener('DOMContentLoaded', () => store.dispatch('getItems'));

  const searchForm = document.querySelector('.filter-app__search');
  const filters = document.querySelectorAll('.filter-app__category');

  const leadInstance = new Lead();
  const listInstance = new List();
  const addItemInstance = new AddItem();

  leadInstance.render();
  listInstance.render();
  addItemInstance.render();

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

  searchForm.elements.search.addEventListener('input', (evt) => {
    store.dispatch('addSearch', { search: evt.target.value.trim() });
  });
};
