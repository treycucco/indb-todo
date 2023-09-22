import { database, useSlice } from '../store';
import type { List } from '../store';
import TodoListItem from './TodoListItem';
import { useCallback } from 'preact/hooks';

const compareLists = (left: List, right: List) =>
  left.name.localeCompare(right.name);

const TodoLists = () => {
  const { ids: listIds, index: listsIndex } = useSlice('lists', compareLists);

  const handleAdd = useCallback(() => {
    const name = prompt('What do you want to name the list?');

    if (name) {
      void database.put('lists', { id: crypto.randomUUID(), name });
    }
  }, []);

  const handleDelete = useCallback((listId: string) => {
    void database.delete('lists', listId);
  }, []);

  return (
    <>
      {listIds.map((listId) => (
        <TodoListItem
          list={listsIndex[listId]}
          key={listId}
          onDelete={handleDelete}
        />
      ))}
      <button type="button" onClick={handleAdd}>
        Add List
      </button>
    </>
  );
};

export default TodoLists;
