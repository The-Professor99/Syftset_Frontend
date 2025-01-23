"use client";
import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from "./firebaseApp";

export const analytics = getAnalytics(firebaseApp);
