import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "./config";

const app = firebase.initializeApp(firebaseConfig);

export const increment = firebase.firestore.FieldValue.increment(1);
export const decrement = firebase.firestore.FieldValue.increment(-1);

export const db = app.firestore();
