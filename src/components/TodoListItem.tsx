import { useCount } from '../store';
import type { List } from '../store';
import styles from './TodoListItem.module.css';
import TodosList from './TodosList';

interface TodoListItemProps {
  list: List;
}

const TodoListItem = ({ list }: TodoListItemProps) => {
  const itemsCount = useCount('todos', 'listId', list.id);
  return (
    <section className={styles.container}>
      <hgroup>
        <h2>{list.name}</h2>
        <h3>{itemsCount}</h3>
      </hgroup>
      <TodosList listId={list.id} />
    </section>
  );
};

export default TodoListItem;
