import { database, useSlice } from '../store';
import type { Todo } from '../store';
import TodoItem from './TodoItem';
import { useCallback } from 'react';

interface TodosListProps {
  listId: string;
}

const compareTodos = (left: Todo, right: Todo) =>
  right.createdAt - left.createdAt;

const TodosList = ({ listId }: TodosListProps) => {
  const { ids: todoIds, index: todosIndex } = useSlice('todos', compareTodos, {
    path: 'listId',
    value: listId,
  });

  const handleEdit = useCallback((todo: Todo) => {
    const title = prompt('What do you want to do?', todo.title);

    if (title) {
      void database.update('todos', todo.id, { title });
    }
  }, []);

  const handleComplete = useCallback((todoId: string) => {
    void database.delete('todos', todoId);
  }, []);

  return (
    <>
      {todoIds.map((todoId) => (
        <TodoItem
          todo={todosIndex[todoId]}
          key={todoId}
          onEdit={handleEdit}
          onComplete={handleComplete}
        />
      ))}
    </>
  );
};

export default TodosList;
