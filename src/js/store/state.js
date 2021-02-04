import { v4 as uuidv4 } from 'uuid';

export default {
  items: [
    {
      id: uuidv4(), label: 'Take a shower', isImportant: true, isDone: false,
    },
    {
      id: uuidv4(), label: 'Drink coffee', isImportant: false, isDone: false,
    },
    {
      id: uuidv4(), label: 'Prepare breakfast', isImportant: false, isDone: false,
    },
  ],
  filter: 'all', // all, active, done,
  search: '',
};
