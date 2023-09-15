import { useSlice } from '../store';
import type { Todo } from '../store';
import TodoItem from './TodoItem';
import { useCallback } from 'react';

interface TodosListProps {
  listId: string;
}

const compareTodos = (left: Todo, right: Todo) =>
  right.createdAt - left.createdAt;

const TodosList = ({ listId }: TodosListProps) => {
  const {
    data: { ids: todoIds, index: todosIndex },
    add,
    update,
    remove,
  } = useSlice('todos', compareTodos, 'listId', listId);

  const handleAdd = useCallback(() => {
    const title = prompt('What do you want to do?');

    if (title) {
      void add({
        id: crypto.randomUUID(),
        listId,
        title,
        createdAt: Date.now(),
      });
    }
  }, [add, listId]);

  const handleEdit = useCallback(
    (todo: Todo) => {
      const title = prompt('What do you want to do?', todo.title);

      if (title) {
        void update(todo.id, { title });
      }
    },
    [update],
  );

  return (
    <>
      {todoIds.map((todoId) => (
        <TodoItem
          todo={todosIndex[todoId]}
          key={todoId}
          onEdit={handleEdit}
          onComplete={remove}
        />
      ))}
      <button type="button" onClick={handleAdd}>
        Add Todo
      </button>
    </>
  );
};

export default TodosList;
