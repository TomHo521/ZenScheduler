// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkdsdGSvcm1YEhNFY7THgouKo_eic5_O8",
  authDomain: "zenscheduler-cb051.firebaseapp.com",
  projectId: "zenscheduler-cb051",
  storageBucket: "zenscheduler-cb051.firebasestorage.app",
  messagingSenderId: "756124660535",
  appId: "1:756124660535:web:2433fe9dcbc297ac7120b2",
  measurementId: "G-B9YTG9P2DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication
export const auth = getAuth(app);
