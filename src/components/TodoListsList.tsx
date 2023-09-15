import { useSlice } from '../store';
import type { List } from '../store';
import TodoListItem from './TodoListItem';

const compareLists = (left: List, right: List) =>
  left.name.localeCompare(right.name);

const TodoListsList = () => {
  const {
    data: { ids: listIds, index: listsIndex },
  } = useSlice('lists', compareLists);

  return (
    <>
      {listIds.map((listId) => (
        <TodoListItem list={listsIndex[listId]} key={listId} />
      ))}
    </>
  );
};

export default TodoListsList;
