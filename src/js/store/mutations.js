import { v4 as uuidv4 } from 'uuid';

export default {
  toggleProperty(state, id, propName) {
    const idx = state.items.findIndex((item) => item.id === id);
    const oldItem = state.items[idx];
    const value = !oldItem[propName];

    const item = { ...state.items[idx], [propName]: value };

    state.items.splice(idx, 1, item);

    return state;
  },

  createItem(label) {
    return {
      id: uuidv4(),
      label,
      important: false,
      done: false,
    };
  },
  makeImportant(state, { id }) {
    return this.toggleProperty(state, id, 'isImportant');
  },
  makeDone(state, { id }) {
    return this.toggleProperty(state, id, 'isDone');
  },
  removeItem(state, { id }) {
    const idx = state.items.findIndex((item) => item.id === id);

    state.items.splice(idx, 1);

    return state;
  },
  addItem(state, { label }) {
    state.items.push(this.createItem(label));

    return state;
  },
  addFilter(state, { filterType }) {
    state.filter = filterType;

    return state;
  },
  addSearch(state, { search }) {
    state.search = search;

    return state;
  },
};
