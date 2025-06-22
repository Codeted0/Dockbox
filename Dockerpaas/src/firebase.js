// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnKVh5OkK9_wr5Cr6BjVcbzR3M2SMdFkw",
  authDomain: "dockbox-ee778.firebaseapp.com",
  projectId: "dockbox-ee778",
  storageBucket: "dockbox-ee778.appspot.com",  // fixed typo here
  messagingSenderId: "267257850235",
  appId: "1:267257850235:web:1b01dcc18c5c0aae3ff5de",
  measurementId: "G-8D52798ZEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// ✅ Export what you need
export { auth };
