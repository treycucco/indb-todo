import type { Todo } from '../store';
import styles from './TodoItem.module.css';
import { useCallback } from 'preact/hooks';

interface TodoItemProps {
  todo: Todo;
  onComplete: (todoId: string) => unknown;
  onEdit: (todo: Todo) => unknown;
}

const TodoItem = ({ todo, onEdit, onComplete }: TodoItemProps) => {
  const { id: todoId } = todo;
  const handleEdit = useCallback(() => {
    onEdit(todo);
  }, [onEdit, todo]);
  const handleComplete = useCallback(() => {
    onComplete(todoId);
  }, [onComplete, todoId]);

  return (
    <div className={styles.container}>
      <p onClick={handleEdit}>{todo.title}</p>
      <button type="button" onClick={handleComplete}>
        Done
      </button>
    </div>
  );
};

export default TodoItem;
