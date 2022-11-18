import {TodoListItem} from '../TodoListItem';
import styles from './TodoList.module.scss';
import {TodoListProps} from './TodoList.type';

export const TodoList = ({count, data, onClick, }: TodoListProps) => (
  <div className={styles.TodoList} data-testid="TodoList">
    {data.map((item) =>
      <TodoListItem
        key={item.id}
        item={item}
        onClick={() => onClick(item.id)}
      />)}
  </div>
);