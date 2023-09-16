import { useSlice } from '../store';
import type { List } from '../store';
import TodoListItem from './TodoListItem';
import { useCallback } from 'react';

const compareLists = (left: List, right: List) =>
  left.name.localeCompare(right.name);

const TodoListsList = () => {
  const {
    data: { ids: listIds, index: listsIndex },
    add,
    remove,
  } = useSlice('lists', compareLists);

  const handleAdd = useCallback(() => {
    const name = prompt('What do you want to name the list?');

    if (name) {
      void add({ id: crypto.randomUUID(), name });
    }
  }, [add]);

  return (
    <>
      {listIds.map((listId) => (
        <TodoListItem
          list={listsIndex[listId]}
          key={listId}
          onDelete={remove}
        />
      ))}
      <button type="button" onClick={handleAdd}>
        Add List
      </button>
    </>
  );
};

export default TodoListsList;
