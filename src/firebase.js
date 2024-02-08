import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBUAgm1O0ihx7e2zEVGkQdhUJtWXwXSv8",
    authDomain: "authentication-f6a94.firebaseapp.com",
    projectId: "authentication-f6a94",
    storageBucket: "authentication-f6a94.appspot.com",
    messagingSenderId: "407860961403",
    appId: "1:407860961403:web:0e2bda431fe5a2adc9c2de",
    measurementId: "G-PWC1WEQMQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleAuthProvider = new GoogleAuthProvider();
export { auth, googleAuthProvider };
export default app;
