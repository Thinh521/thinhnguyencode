import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSHzwTdr2hQi79u-9W8YE1NlA557mjmtc",
  authDomain: "phuc-thinh-dev-c3c2d.firebaseapp.com",
  projectId: "phuc-thinh-dev-c3c2d",
  storageBucket: "phuc-thinh-dev-c3c2d.firebasestorage.app",
  messagingSenderId: "748359074033",
  appId: "1:748359074033:web:c027e83642ee703e626950",
  measurementId: "G-YDBD7QZ140",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

signInAnonymously(auth).catch((error) => {
  console.error("Anonymous sign-in failed:", error);
});

export { db, auth };
