import {initializeApp} from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyCZfy0jj7Tgtdx-DVEvVXFypKi2_J1bh1U",
  
    authDomain: "kicks-20fb3.firebaseapp.com",
  
    projectId: "kicks-20fb3",
  
    storageBucket: "kicks-20fb3.appspot.com",
  
    messagingSenderId: "169938384981",
  
    appId: "1:169938384981:web:ce976f168fa8a33157fcdc"
  
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

export { db, storage , app };