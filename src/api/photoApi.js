import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribePhotos = (callback) => {
  const unsubscribe = onSnapshot(collection(db, "photosData"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });

  return unsubscribe;
};
