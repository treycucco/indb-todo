import type { SchemaDefinition } from '@indb/database';
import { createStore } from '@indb/preact';

export interface Todo {
  listId: string;
  id: string;
  title: string;
  createdAt: number;
}

export interface List {
  id: string;
  name: string;
}

interface Tables {
  lists: List;
  todos: Todo;
}

const DATABASE_NAME = 'todos';
const SCHEMA: SchemaDefinition<Tables> = {
  version: 1,
  stores: {
    lists: {
      keyPath: 'id',
    },
    todos: {
      keyPath: 'id',
      indices: {
        listId: {},
      },
    },
  },
  customMigration: (transaction, schema, oldVersion) => {
    if (oldVersion === 0 && schema.version >= 1) {
      const { lists, todos } = getInitialData();

      const listsStore = transaction.objectStore('lists');
      const todosStore = transaction.objectStore('todos');

      lists.forEach((list) => listsStore.put(list));
      todos.forEach((todo) => todosStore.put(todo));
    }
  },
};

const getInitialData = () => {
  const personalId = crypto.randomUUID();
  const lists: List[] = [
    { id: crypto.randomUUID(), name: 'Scheduled' },
    { id: personalId, name: 'Personal' },
    { id: crypto.randomUUID(), name: 'Work' },
  ];

  const todos: Todo[] = [
    {
      id: crypto.randomUUID(),
      listId: personalId,
      title: 'Try out todos',
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      listId: personalId,
      title: 'Add a todo',
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      listId: personalId,
      title: 'Check a todo off',
      createdAt: Date.now(),
    },
  ];

  return { lists, todos };
};

const { useSlice, useCount, database } = createStore<Tables>(
  DATABASE_NAME,
  SCHEMA,
);

export { useSlice, useCount, database };
