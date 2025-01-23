import {
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  ActionCodeSettings,
} from "firebase/auth";
import { auth } from "./firebaseApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  return await _signInWithEmailAndPassword(auth, email, password);
}

export async function sendPasswordResetEmail(
  email: string,
  actionCodeSettings: ActionCodeSettings
) {
  return await _sendPasswordResetEmail(auth, email, actionCodeSettings);
}

export async function signOut() {
  return await auth.signOut();
}
