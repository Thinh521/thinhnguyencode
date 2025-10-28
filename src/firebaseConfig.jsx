import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export { db };
