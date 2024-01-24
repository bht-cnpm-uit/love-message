import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD09kNEOneN_dIhhI41btZQ8iNSr1rbaGs",
    authDomain: "love-message-ac796.firebaseapp.com",
    projectId: "love-message-ac796",
    storageBucket: "love-message-ac796.appspot.com",
    messagingSenderId: "870633465275",
    appId: "1:870633465275:web:c443b266772a778843109e",
    measurementId: "G-E2N3DTN46M"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

