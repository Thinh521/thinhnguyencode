import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const subscribeStories = (callback) => {
  const q = query(collection(db, "storiesData"), orderBy("id", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });

  return unsubscribe;
};
