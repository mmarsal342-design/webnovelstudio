// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTSuHr1TGsyVwChj2CTb207vlHxzAAEVg",
  authDomain: "webnovel-nextjs.firebaseapp.com",
  projectId: "webnovel-nextjs",
  storageBucket: "webnovel-nextjs.firebasestorage.app",
  messagingSenderId: "447591377254",
  appId: "1:447591377254:web:4706d9610a139306ba00a7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
