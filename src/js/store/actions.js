export default {
  makeImportant(context, payload) {
    context.commit('makeImportant', payload);
  },
  makeDone(context, payload) {
    context.commit('makeDone', payload);
  },
  removeItem(context, payload) {
    context.commit('removeItem', payload);
  },
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  addFilter(context, payload) {
    context.commit('addFilter', payload);
  },
  addSearch(context, payload) {
    context.commit('addSearch', payload);
  },
};
