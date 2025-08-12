import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "depositback.firebaseapp.com",
  projectId: "depositback",
  storageBucket: "depositback.firebasestorage.app",
  messagingSenderId: "294865074710",
  appId: "1:294865074710:web:d95fd524163519b68b1337",
  measurementId: "G-S7BX38TDF7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log("🚀 ~ auth:", auth);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging };

export default app; // Export the app if needed
