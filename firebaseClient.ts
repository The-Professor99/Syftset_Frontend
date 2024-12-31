"use client";
import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

export { analytics };
