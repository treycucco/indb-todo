import { database, useCount } from '../store';
import type { List } from '../store';
import styles from './TodoListItem.module.css';
import TodosList from './TodosList';
import { useCallback } from 'react';

interface TodoListItemProps {
  list: List;
  onDelete: (listId: string) => unknown;
}

const TodoListItem = ({ list }: TodoListItemProps) => {
  const { id: listId } = list;
  const itemsCount = useCount('todos', 'listId', list.id);

  const handleAddTodo = useCallback(() => {
    const title = prompt('What do you want to do?');

    if (title) {
      void database.put('todos', {
        id: crypto.randomUUID(),
        listId,
        title,
        createdAt: Date.now(),
      });
    }
  }, [listId]);

  const handleDeleteList = useCallback(() => {
    if (confirm('Are you sure you want to delete this list?')) {
      // TODO: Delete linked todos as well. Either provide a `deleteIndex`, or make a way to have
      //       foreign-key like functionality where things are deleted automatically?
      void database.delete('lists', listId);
    }
  }, [listId]);

  return (
    <section className={styles.container}>
      <hgroup>
        <h2>{list.name}</h2>
        <h3>{itemsCount}</h3>
      </hgroup>
      <TodosList listId={listId} />
      <div className={styles.controls}>
        <button type="button" onClick={handleAddTodo}>
          Add Todo
        </button>
        <button type="button" onClick={handleDeleteList}>
          Delete List
        </button>
      </div>
    </section>
  );
};

export default TodoListItem;
