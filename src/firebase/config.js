import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBVr7czJS0obCZi8_Mc04G-NFRbgFFVSmY",
    authDomain: "lit-library-27d03.firebaseapp.com",
    projectId: "lit-library-27d03",
    storageBucket: "lit-library-27d03.firebasestorage.app",
    messagingSenderId: "833254176096",
    appId: "1:833254176096:web:c5ba5541e1007f2e131a05"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app)

const booksCollectionRef = collection(db, 'books')

export { db, booksCollectionRef, auth, storage }