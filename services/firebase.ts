
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDd6h9Shp4FT_9TmZv6YFAhD6e6FDdJad8",
  authDomain: "filaexpress-1d5bf.firebaseapp.com",
  projectId: "filaexpress-1d5bf",
  storageBucket: "filaexpress-1d5bf.firebasestorage.app",
  messagingSenderId: "553705646225",
  appId: "1:553705646225:web:c849b6019c73055146b730"
};

//const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);