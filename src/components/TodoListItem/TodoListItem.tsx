import classNames from 'classnames';
import styles from './TodoListItem.module.scss';
import {TodoListItemProps} from './TodoListItem.type';

export const TodoListItem = ({item, checkHandler, editHandler, deleteHandler}: TodoListItemProps) => {

  function withoutDefault(event: React.MouseEvent, func: () => void) {
    event.stopPropagation();
    event.preventDefault();
    func();
  }

  return (
    <div
      className={classNames(
        styles.TodoItem,
        item.isChecked ? styles.TodoItem__checked : styles.TodoItem__active
      )}
      onClick={(e) => withoutDefault(e, checkHandler)}
    >
      <h3 className={styles.TodoItem__header}> {item.title} </h3>
      <p className={styles.TodoItem__description}>{item.description}</p>
      <p className={styles.TodoItem__description}>expired date: {item.expired}</p>
      {item.filePath &&
        <p className={styles.TodoItem__description}>attached file:
          <a className={styles.TodoItem__link} href={item.filePath} target={'_blank'} rel={'noopener noreferrer'}>
            download
          </a>
        </p>}
      <div className={styles.TodoItem__buttons}>
        <button onClick={(e) => withoutDefault(e, editHandler)}>edit</button>
        <button onClick={(e) => withoutDefault(e, deleteHandler)}>delete</button>
      </div>
    </div>
  );
};