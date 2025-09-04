
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "asynaptix",
  appId: "1:105157733446:web:cff09d79bb0cfd9db02e47",
  storageBucket: "asynaptix.firebasestorage.app",
  apiKey: "AIzaSyB6LM9KiQdagybrCNNeYQ7sOvaguUgDb6s",
  authDomain: "asynaptix.firebaseapp.com",
  messagingSenderId: "105157733446"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
