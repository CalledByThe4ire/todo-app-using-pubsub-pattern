import { v4 as uuidv4 } from 'uuid';

const URL = 'api/items';

export default {
  toggleProperty(state, id, propName) {
    const idx = state.items.findIndex((item) => item.id === id);
    const oldItem = state.items[idx];
    const value = !oldItem[propName];
    const newItem = { ...state.items[idx], [propName]: value };

    return newItem;
  },
  createItem(label) {
    return {
      id: uuidv4(),
      label,
      important: false,
      done: false,
    };
  },
  addFilter(context, payload) {
    context.commit('addFilter', payload);
  },
  addSearch(context, payload) {
    context.commit('addSearch', payload);
  },
  async getItems(context) {
    try {
      context.commit('setLoading');

      const res = await fetch(`${URL}`);

      const data = await res.json();

      context.commit('addItems', { items: data });
    } catch (error) {
      console.error(error.message);
    }
  },
  async addItem(context, payload) {
    try {
      const newItem = this.createItem(payload.label);
      const res = await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      context.commit('addItem', { newItem: data });
    } catch (error) {
      console.error(error.message);
    }
  },
  async updateItem(context, payload) {
    try {
      const newItem = this.toggleProperty(
        context.state,
        payload.id,
        payload.propName,
      );

      const res = await fetch(`${URL}/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      context.commit('updateItem', { item: data });
    } catch (error) {
      console.error(error.message);
    }
  },
  async removeItem(context, payload) {
    try {
      const res = await fetch(`${URL}/${payload.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      context.commit('removeItem', payload);
    } catch (error) {
      console.error(error.message);
    }
  },
};
