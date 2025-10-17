// src/config/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// SUBSTITUA PELAS SUAS CREDENCIAIS REAIS DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyDnwynjwtl2cqtX0sIL9FQxePN9xkNsB7w",
  authDomain: "sprint-04-mobile.firebaseapp.com",
  projectId: "sprint-04-mobile",
  storageBucket: "sprint-04-mobile.firebasestorage.app",
  messagingSenderId: "351512889155",
  appId: "1:351512889155:web:9b879e7e6647ae6e93d1f6",
  measurementId: "G-BN4Q29S547"
};

const app = initializeApp(firebaseConfig);

// Esta é a nossa conexão com o banco de dados
export const db = getFirestore(app);