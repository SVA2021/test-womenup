import styles from './TodoListItem.module.scss';
import {TodoListItemProps} from './TodoListItem.type';
import classNames from 'classnames';

export const TodoListItem = ({item, onClick}: TodoListItemProps) => (
  <div
    className={classNames(
      styles.TodoListItem,
      item.isChecked ? styles.TodoListItem__checked : styles.TodoListItem__active,
    )}
    data-testid="TodoListItem"
    onClick={onClick}
  >
    {item.text}
  </div>
);