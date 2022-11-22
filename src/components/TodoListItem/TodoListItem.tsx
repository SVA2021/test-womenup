import classNames from 'classnames';
import {FC} from 'react';
import styles from './TodoListItem.module.scss';
import {TodoListItemProps} from './TodoListItem.type';

/**
 * @param item: TodoItem, main data of todo task
 * @param checkHandler: void, callback for changing status of todo task
 * @param editHandler: void, callback for starting edit todo task
 * @param deleteHandler: void, callback for deleting of todo task
 * @returns JSX component
 */

export const TodoListItem: FC<TodoListItemProps> = ({item, checkHandler, editHandler, deleteHandler}) => {

  function withoutDefault(event: React.MouseEvent, func: () => void) {
    event.stopPropagation();
    event.preventDefault();
    func();
  }

  const isDateOver = new Date().getTime() < new Date(item.expired).getTime();

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
      <p className={styles.TodoItem__description}>
        expired date: {item.expired}
        {isDateOver && <span className={styles.TodoItem__overdate} >!!!Date is over!!!</span>}
      </p>
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