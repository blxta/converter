import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8V3XIQLQAKgYHPBfutslV55YvlDfvGCA",
  authDomain: "converter-94b59.firebaseapp.com",
  projectId: "converter-94b59",
  storageBucket: "converter-94b59.appspot.com",
  messagingSenderId: "105787922013",
  appId: "1:105787922013:web:de07eea113fe4aa056dfb4",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
