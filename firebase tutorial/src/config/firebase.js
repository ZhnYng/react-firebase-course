import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5KxS7gpBUh-fgwTKgzjHyP8GhFQ7i86Y",
  authDomain: "fir-course-4bf90.firebaseapp.com",
  projectId: "fir-course-4bf90",
  storageBucket: "fir-course-4bf90.appspot.com",
  messagingSenderId: "657288315044",
  appId: "1:657288315044:web:20329c011368f10c07a631",
  measurementId: "G-YLQ805EMLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);