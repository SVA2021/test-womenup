import dayjs from 'dayjs';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import React, {FC, useState} from 'react';
import {db, storage} from '../../firebase';
import styles from './TodoForm.module.scss';
import {TodoFormProps} from './TodoForm.type';

export const TodoForm: FC<TodoFormProps> = ({todo, closeHandler}) => {

  const [title, setTitle] = useState<string>(todo?.title ?? '');
  const [description, setDescription] = useState<string>(todo?.description ?? '');
  const [expired, setExpired] = useState<string>(dayjs(todo?.expired).format('YYYY--MM-DD') ?? '');
  const [filePath, setFilePath] = useState<string | null>(todo?.filePath ?? null);
  const [error, setError] = useState<string | null>(null);

  function closeOnSubmit() {
    setTitle('');
    setDescription('');
    setExpired('');
    setFilePath('');
    setError(null);
    closeHandler();
  }

  function checkError(): string | null {
    if (!title) return 'fill title'
    if (!description) return 'fill description'
    return null
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return false;
    const newFile = event.target.files[0];
    const storageRef = ref(storage, newFile.name);
    uploadBytes(storageRef, newFile)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((link) => {
            setError(null)
            setFilePath(link)
          })
          .catch((error) => setError(error));
      })
      .catch((error) => setError(error));
  }

  function onFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(checkError());
    if (error) return false;

    addDoc(collection(db, 'todos'), {
      id: serverTimestamp(),
      title,
      description,
      expired: new Date(expired),
      filePath,
      isChecked: false,
    })
      .then(() => closeOnSubmit())
      .catch((error) => setError(error));
  }

  return (
    <div className={styles.TodoForm}>
      <form onSubmit={onFormSubmit} className={styles.TodoForm__body} >
        <label className={styles.TodoForm__field}>
          Title
          <input type="text" name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.TodoForm__field}>
          Description
          <textarea name="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </label>
        <label className={styles.TodoForm__file}>
          {filePath ?? 'Upload File'}
          <input className={styles.TodoForm__fileInput} type="file" name="file" onChange={handleFileUpload} />
          <button onClick={() => setFilePath(null)}>clear file</button>
        </label>
        <label className={styles.TodoForm__field}>
          Expired
          <input type="date" name="expired"
            value={expired}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpired(e.target.value)} />
        </label>
        {!error && <p>{error}</p>}
        <input type="submit" value="Submit" className={styles.TodoForm__submit} />
      </form>
      <button className={styles.TodoForm__close} onClick={closeOnSubmit}>close</button>
    </div>
  );
};