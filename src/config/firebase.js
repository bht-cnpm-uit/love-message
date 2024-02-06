import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyD09kNEOneN_dIhhI41btZQ8iNSr1rbaGs",
//     authDomain: "love-message-ac796.firebaseapp.com",
//     projectId: "love-message-ac796",
//     storageBucket: "love-message-ac796.appspot.com",
//     messagingSenderId: "870633465275",
//     appId: "1:870633465275:web:c443b266772a778843109e",
//     measurementId: "G-E2N3DTN46M"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA_YRmK2da7SLlnuS1npIyw2q7nEH22kEg",
  authDomain: "love-message-3bff6.firebaseapp.com",
  projectId: "love-message-3bff6",
  storageBucket: "love-message-3bff6.appspot.com",
  messagingSenderId: "464254606485",
  appId: "1:464254606485:web:680880ed091ef681108f9c",
  measurementId: "G-D6VENYS52Q"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

