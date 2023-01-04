// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDklPEUW8IzSxbh7RBkXCEiRbAKZP0Dxok",
  authDomain: "todo-a9243.firebaseapp.com",
  databaseURL: "https://todo-a9243-default-rtdb.firebaseio.com",
  projectId: "todo-a9243",
  storageBucket: "todo-a9243.appspot.com",
  messagingSenderId: "284675930617",
  appId: "1:284675930617:web:3de7cd62416486b9662528",
  measurementId: "G-8TR5JPEHQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app