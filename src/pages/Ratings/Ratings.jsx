import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import { db, auth } from "../../firebaseConfig";
import Header from "../../components/Header/Header";
import FormField from "../../components/FormField/FormField";
import Divider from "../../components/Divider/Divider";

export default function Ratings() {
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const ratingsRef = collection(db, "ratings");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Đăng nhập ẩn danh
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
  }, []);

  // Lấy danh sách đánh giá
  const fetchRatings = async () => {
    const snapshot = await getDocs(
      query(ratingsRef, orderBy("createdAt", "desc"))
    );
    const data = snapshot.docs.map((doc) => doc.data());
    setRatings(data);

    if (data.length > 0) {
      const avg =
        data.reduce((sum, item) => sum + item.rating, 0) / data.length;
      setAverageRating(avg.toFixed(1));
      setTotalRatings(data.length);
    } else {
      setAverageRating(0);
      setTotalRatings(0);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const randomAvatar = () => {
    const seed = Math.floor(Math.random() * 10000);
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  };

  const onSubmit = async (data) => {
    // data.star đã có giá trị từ hidden input
    const newRating = {
      name: data.name,
      rating: data.star,
      description: data.description,
      avatar: randomAvatar(),
      createdAt: serverTimestamp(),
      userId,
    };

    await addDoc(ratingsRef, newRating);

    reset();
    setStar(0);
    fetchRatings();
  };

  return (
    <article>
      <Header
        title="Đánh giá"
        subtitle="Chia sẻ cảm nhận của bạn về sản phẩm của mình"
      />

      {/* Form điền thông tin */}
      <section>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Họ và tên"
            name="name"
            register={register}
            errors={errors}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Đánh giá</label>
            <div className="flex flex-col items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-lg pb-1.5">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStar(s);
                      setValue("star", s, { shouldValidate: true });
                    }}
                    onMouseEnter={() => setHoverStar(s)}
                    onMouseLeave={() => setHoverStar(0)}
                    className={`text-3xl transition ${
                      s <= (hoverStar || star)
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <input
                type="hidden"
                {...register("star", {
                  required: "Vui lòng chọn ít nhất 1 sao!",
                  min: { value: 1, message: "Vui lòng chọn ít nhất 1 sao!" },
                })}
                value={star}
              />

              {errors.star && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.star.message}
                </p>
              )}
            </div>
          </div>

          <FormField
            label="Mô tả cảm nhận"
            name="description"
            type="textarea"
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Gửi đánh giá
          </button>
        </form>
      </section>

      <section className="my-10">
        <Divider />
      </section>

      {/* Thông tin trung bình */}
      <div className="flex items-center justify-between text-center text-gray-600 mt-4">
        <p>
          Trung bình:
          <span className="font-semibold text-yellow-500">
            {averageRating} ⭐
          </span>
        </p>
        <p> {totalRatings} lượt đánh giá</p>
      </div>

      {/* Danh sách đánh giá */}
      <div className="mt-4 max-h-96 overflow-y-auto border-t border-gray-200 pt-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {ratings.map((r, i) => {
          const createdAt = r.createdAt?.seconds
            ? new Date(r.createdAt.seconds * 1000)
            : new Date(r.createdAt?.toDate?.() || r.createdAt);
          const formattedDate = createdAt.toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          return (
            <div
              key={i}
              className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <img
                src={r.avatar}
                alt={r.name}
                className="w-12 h-12 rounded-full border border-gray-200 dark:border-neutral-700/50 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{r.name}</p>
                  <div className="flex items-center">
                    <p className="text-yellow-400 text-sm">
                      {"★".repeat(r.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - r.rating)}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-1">{r.description}</p>
                <p className="text-gray-400 text-xs mt-2">{formattedDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
