import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB8V3XIQLQAKgYHPBfutslV55YvlDfvGCA",
  authDomain: "converter-94b59.firebaseapp.com",
  databaseURL:
    "https://converter-94b59-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "converter-94b59",
  storageBucket: "converter-94b59.appspot.com",
  messagingSenderId: "105787922013",
  appId: "1:105787922013:web:de07eea113fe4aa056dfb4",
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
