import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
/**
 * base config and connections for firebase 
 */
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
export const storage = getStorage();