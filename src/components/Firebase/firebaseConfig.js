import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: **,
    authDomain: **,
    projectId: **,
    storageBucket: **,
    messagingSenderId: **,
    appId: **
    };



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

