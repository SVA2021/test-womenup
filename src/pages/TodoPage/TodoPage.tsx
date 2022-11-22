import {
  collection, CollectionReference, deleteDoc, doc,
  onSnapshot, query, updateDoc
} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {TodoForm} from '../../components/TodoForm';
import {TodoListItem} from '../../components/TodoListItem';
import {TodoItem} from '../../components/TodoListItem/TodoListItem.type';
import {db} from '../../firebase';
import styles from './TodoPage.module.scss';

const q = query(collection(db, 'todos') as CollectionReference<TodoItem>)

export const TodoPage = () => {

  const [state, setState] = useState<TodoItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editedIten, setEditedItem] = useState<TodoItem | null>(null);

  useEffect(() => {
    onSnapshot<TodoItem>(q, (res) => {
      const result: TodoItem[] = [];
      res.docs.forEach((doc) => {
        const item = doc.data()
        result.push({...item, id: doc.id})
      })
      setState(result);
    })
  }, [])

  const checkTodo = (id: string, isChecked: boolean) => {
    updateDoc(doc(db, 'todos', id), {isChecked: !isChecked})
  }

  const delTodo = (id: string) => {
    deleteDoc(doc(collection(db, 'todos'), id))
  }

  const closeHandler = () => {
    setEditedItem(null);
    setIsOpen(false);
  }

  const editHandler = (item: TodoItem) => {
    setEditedItem(item);
    setIsOpen(true);
  }

  return (
    <section className={styles.TodoPage} data-testid="TodoPage">
      <header className={styles.TodoPage__header} >
        <h2>TodoList Header</h2>
      </header>
      <button className={styles.TodoPage__btn} onClick={() => setIsOpen(true)} >add new task</button>
      <div className="body">
        {state.map((item) =>
          <TodoListItem
            key={item.id}
            item={item}
            checkHandler={() => checkTodo(item.id, item.isChecked)}
            editHandler={() => editHandler(item)}
            deleteHandler={() => delTodo(item.id)}
          />,
        )}
      </div>
      {isOpen && <TodoForm todo={editedIten} closeHandler={closeHandler} />}
    </section>
  )
};