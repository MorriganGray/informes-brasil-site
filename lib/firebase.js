// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDUy9NyrdcxGff6L5He0lsFJSDJwyxM3w",
  authDomain: "informes-brasil-news.firebaseapp.com",
  databaseURL: "https://informes-brasil-news-default-rtdb.firebaseio.com",
  projectId: "informes-brasil-news",
  storageBucket: "informes-brasil-news.firebasestorage.app",
  messagingSenderId: "828103225180",
  appId: "1:828103225180:web:d30284b758446181681b99",
  measurementId: "G-T7GKJB5WKX"
};

// Inicializa o Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };