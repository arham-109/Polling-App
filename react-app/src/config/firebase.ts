import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDLrW8-6UBigLCY8xIrYOeJMKOTNmlZtC4",
  authDomain: "polling-app-89496.firebaseapp.com",
  projectId: "polling-app-89496",
  storageBucket: "polling-app-89496.firebasestorage.app",
  messagingSenderId: "43946212365",
  appId: "1:43946212365:web:1ed9628347f1926e7d6944",
  measurementId: "G-LVYWDCB2GL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
