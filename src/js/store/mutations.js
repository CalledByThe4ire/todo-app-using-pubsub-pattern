import { v4 as uuidv4 } from 'uuid';

export default {
  addFilter(state, { filterType }) {
    state.filter = filterType;

    return state;
  },
  addSearch(state, { search }) {
    state.search = search;

    return state;
  },
  setLoading(state) {
    state.isLoading = true;

    return state;
  },
  addItem(state, { newItem }) {
    state.items.push(newItem);
    state.isLoading = false;

    return state;
  },
  addItems(state, { items }) {
    state.items = items;
    state.isLoading = false;

    return state;
  },
  updateItem(state, { item }) {
    state.items = state.items.map((value) => (value.id === item.id ? item : value));
    state.isLoading = false;

    return item;
  },
  removeItem(state, { id }) {
    const idx = state.items.findIndex((item) => item.id === id);

    state.items.splice(idx, 1);
    state.isLoading = false;

    return state;
  },
};
