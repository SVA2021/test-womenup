import {initializeApp} from 'firebase/app';
import {collection, Firestore, getDocs, getFirestore} from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_MSID,
    appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(config);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function getData(db: Firestore) {
    const todosCol = collection(db, 'todos');
    const todoSnapshot = await getDocs(todosCol);
    const todoList = todoSnapshot.docs.map(doc => doc.data());
    return todoList;
}