import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getPhotos = async () => {
  try {
    const snapshot = await getDocs(collection(db, "photosData"));
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData,
      };
    });
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy data từ Firebase:", error);
    return [];
  }
};
