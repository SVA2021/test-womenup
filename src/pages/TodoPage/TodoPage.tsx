import React, {FC, useRef, useState} from 'react';
import {TodoList} from '../../components/TodoList';
import styles from './TodoPage.module.scss';

export const TodoPage = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState({
    data: [{id: 0, isChecked: false, text: 'add tasks in input area'}],
    counter: 0,
  });

  function checkTask(id: number) {
    setState((v) => ({
      ...v,
      data: state.data.map((v) => ({...v, isChecked: v.id === id ? !v.isChecked : v.isChecked}))
    })
    )
  }

  function addTask(task: string | undefined) {
    if (!task) return false
    if (ref.current?.value) ref.current.value = ''

    setState((v) => ({
      ...v,
      counter: state.counter + 1,
      data: [...state.data, {id: state.counter + 1, isChecked: false, text: task}],
    })
    )
  }

  return (
    <section className={styles.TodoPage} data-testid="TodoPage">
      <header className={styles.TodoPage__header} >
        <h2>TodoList Header</h2>
      </header>
      <div className={styles.TodoPage__inputarea}>
        <input type="text" minLength={3} ref={ref} className={styles.TodoPage__input} />
        <button onClick={() => addTask(ref.current?.value)} className={styles.TodoPage__btn}>add</button>
      </div>
      <TodoList count={state.counter} data={state.data} onClick={checkTask} />
    </section>
  )
};