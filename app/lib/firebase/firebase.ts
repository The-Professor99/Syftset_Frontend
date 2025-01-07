import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase
const app = initializeApp(firebaseConfig, {});
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db, app };
