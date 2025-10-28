// import { useEffect, useState } from "react";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// import { db } from "../firebaseConfig";

// export default function VisitorCounter() {
//   const [totalVisitors, setTotalVisitors] = useState(0);
//   const [todayVisitors, setTodayVisitors] = useState(0);

//   useEffect(() => {
//     const trackVisitor = async () => {
//       try {
//         // 🔹 1. Lấy hoặc tạo userId
//         let userId = localStorage.getItem("visitor_id");
//         if (!userId) {
//           userId = crypto.randomUUID();
//           localStorage.setItem("visitor_id", userId);
//           console.log("Tạo userId mới:", userId);
//         }

//         const today = new Date().toISOString().split("T")[0];
//         const ref = doc(db, "stats", "visitors");
//         const snap = await getDoc(ref);

//         // 🔹 2. Nếu chưa có document -> tạo mới
//         if (!snap.exists()) {
//           const initialData = {
//             totalCount: 1,
//             daily: {
//               [today]: [userId],
//             },
//           };
//           await setDoc(ref, initialData);
//           setTotalVisitors(1);
//           setTodayVisitors(1);
//           return;
//         }

//         // 🔹 3. Nếu đã có document
//         const data = snap.data() || {};
//         let totalCount = data.totalCount || 0;
//         let daily = data.daily || {};
//         let todayList = daily[today] || [];

//         // Kiểm tra nếu user đã vào hôm nay chưa
//         let isNewToday = false;
//         if (!todayList.includes(userId)) {
//           todayList.push(userId);
//           daily[today] = todayList;
//           isNewToday = true;
//         }

//         // Kiểm tra nếu user là hoàn toàn mới (chưa có trong các ngày khác)
//         let isTotallyNew = true;
//         for (const day in daily) {
//           if (daily[day].includes(userId) && day !== today) {
//             isTotallyNew = false;
//             break;
//           }
//         }

//         if (isTotallyNew) totalCount += 1;

//         // 🔹 4. Cập nhật Firestore
//         await updateDoc(ref, {
//           totalCount,
//           daily,
//         });

//         setTotalVisitors(totalCount);
//         setTodayVisitors(todayList.length);
//       } catch (error) {
//         console.error("Lỗi cập nhật dữ liệu Firestore:", error);
//       }
//     };

//     trackVisitor();
//   }, []);

//   // 🔹 5. Luôn hiển thị an toàn
//   return (
//     <div className="flex flex-col items-center justify-center text-sm font-medium space-y-1">
//       <p className="text-sm text-black dark:text-white flex items-center gap-1">
//         <span>Tổng truy cập:</span> {totalVisitors ?? 0}
//       </p>
//       <p className="text-sm text-black dark:text-white flex items-center gap-1">
//         <span>Hôm nay:</span> {todayVisitors ?? 0}
//       </p>
//     </div>
//   );
// }
