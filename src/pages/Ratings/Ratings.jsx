import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import { db, auth } from "../../firebaseConfig";
import Header from "../../components/Header/Header";
import FormField from "../../components/FormField/FormField";
import Divider from "../../components/Divider/Divider";
import {
  Star,
  Users,
  Clock,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ShimmerButton from "../../components/Button/ShimmerButton";

export default function Ratings() {
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [star, setStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStar, setFilterStar] = useState(0);
  const [loading, setLoading] = useState(false);

  const ratingsRef = collection(db, "ratings");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  watch();

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
    setFilteredRatings(data);

    if (data.length > 0) {
      const avg =
        data.reduce((sum, item) => sum + Number(item.rating), 0) / data.length;
      setAverageRating(Number(avg.toFixed(1)));
      setTotalRatings(data.length);
    } else {
      setAverageRating(0);
      setTotalRatings(0);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  // Lọc và tìm kiếm
  useEffect(() => {
    let filtered = ratings;

    // Lọc theo số sao
    if (filterStar > 0) {
      filtered = filtered.filter((r) => r.rating === filterStar);
    }

    // Tìm kiếm theo tên hoặc mô tả
    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRatings(filtered);
  }, [searchTerm, filterStar, ratings]);

  const randomAvatar = () => {
    const seed = Math.floor(Math.random() * 10000);
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const newRating = {
        name: data.name,
        rating: data.star,
        description: data.description,
        avatar: randomAvatar(),
        createdAt: serverTimestamp(),
        userId,
      };

      await addDoc(ratingsRef, newRating);
      await fetchRatings();
      reset();
      setStar(0);

      toast.success("Cảm ơn bạn! Đánh giá đã được gửi thành công.", {
        icon: null,
      });
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", {
        icon: null,
      });
    } finally {
      setLoading(false);
    }
  };

  // Tính phần trăm theo sao
  const getStarPercentage = (starCount) => {
    if (totalRatings === 0) return 0;
    const count = ratings.filter((r) => r.rating === starCount).length;
    return ((count / totalRatings) * 100).toFixed(0);
  };

  return (
    <article>
      <Header
        title="Đánh giá"
        subtitle="Chia sẻ cảm nhận của bạn về sản phẩm"
      />

      {/* Form Section */}
      <section className="mb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            label="Họ và tên"
            name="name"
            register={register}
            errors={errors}
          />

          <div>
            <label className="block text-sm font-medium mb-3">
              Mức độ hài lòng
            </label>
            <div className="flex flex-col items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl p-6 shadow-sm">
              <div className="flex justify-center space-x-3 mb-2">
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
                    className="transform transition-all duration-200"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        s <= (hoverStar || star)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {star === 0 && "Nhấn để chọn số sao"}
                {star === 1 && "⭐ Rất tệ"}
                {star === 2 && "⭐⭐ Tệ"}
                {star === 3 && "⭐⭐⭐ Bình thường"}
                {star === 4 && "⭐⭐⭐⭐ Tốt"}
                {star === 5 && "⭐⭐⭐⭐⭐ Tuyệt vời"}
              </p>

              <input
                type="hidden"
                {...register("star", {
                  required: "Vui lòng chọn ít nhất 1 sao!",
                  min: { value: 1, message: "Vui lòng chọn ít nhất 1 sao!" },
                })}
                value={star}
              />

              {errors.star && (
                <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.star.message}</span>
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

          <ShimmerButton
            type="submit"
            disabled={loading}
            className="rounded-xl w-full"
          >
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </ShimmerButton>
        </form>
      </section>

      <Divider className="my-10" />

      {/* Statistics Section */}
      <section className="mb-8">
        <SectionTitle className="mb-4">Thống kê đánh giá</SectionTitle>

        <div className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Trái: Điểm trung bình */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <p className="text-5xl font-bold text-gray-800 dark:text-white">
                  {averageRating.toFixed(1)}
                </p>
                <span className="text-2xl">/ 5.0</span>
              </div>

              <div className="flex items-center justify-center space-x-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-neutral-600"
                    }`}
                  />
                ))}
              </div>

              <div className=" text-sm flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <p>
                  Tổng cộng{" "}
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {totalRatings}
                  </span>{" "}
                  lượt đánh giá
                </p>
              </div>
            </div>

            {/* Phải: Phân bố sao */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((starNum) => (
                <div key={starNum} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium text-black dark:text-white">
                      {starNum}
                    </span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${getStarPercentage(starNum)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-black dark:text-white w-12 text-right">
                    {getStarPercentage(starNum)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle>Tất cả đánh giá</SectionTitle>
          <p className="text-sm font-medium text-black dark:text-white">
            {filteredRatings.length} đánh giá
            {searchTerm || filterStar > 0 ? " được tìm thấy" : ""}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="w-full overflow-hidden mb-6">
          <div className="grid grid-cols-[7fr_3fr] gap-2 items-center">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800 dark:text-neutral-400 focus:outline-none transition rounded-xl"
              />
            </div>

            {/* Star Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              <select
                value={filterStar}
                onChange={(e) => setFilterStar(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-neutral-700/50 bg-white dark:bg-neutral-800 focus:outline-none transition appearance-none cursor-pointer rounded-xl"
              >
                <option value={0}>Tất cả</option>
                <option value={5}>5 ⭐</option>
                <option value={4}>4 ⭐</option>
                <option value={3}>3 ⭐</option>
                <option value={2}>2 ⭐</option>
                <option value={1}>1 ⭐</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filterStar > 0) && (
            <>
              <Divider className="mt-4" />

              <div className="flex items-center space-x-2 mt-4">
                <span className="text-sm">Đang lọc:</span>
                {searchTerm && (
                  <span className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 text-gray-700 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                    Từ khóa: "{searchTerm}"
                  </span>
                )}
                {filterStar > 0 && (
                  <span className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 text-gray-700 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                    {filterStar} sao
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStar(0);
                  }}
                  className="text-sm text-red-500 hover:text-red-600 font-medium ml-2"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl shadow-sm animate-pulse"
              >
                <div className="flex items-center space-x-3 mb-3">
                  {/* Avatar giả */}
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-neutral-700" />
                  <div className="flex-1 space-y-2">
                    <div className="w-1/3 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 bg-gray-300 dark:bg-neutral-700 rounded"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full h-16 bg-gray-200 dark:bg-neutral-700 rounded mb-3" />

                <Divider className="my-2.5" />

                <div className="w-1/4 h-4 bg-gray-300 dark:bg-neutral-700 rounded" />
              </div>
            ))
          ) : filteredRatings.length > 0 ? (
            filteredRatings.map((r, i) => {
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
                  className="group p-4 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {/* Avatar với name, rating*/}
                    <div className="flex-shrink-0">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-neutral-600 object-cover ring-2 ring-transparent "
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-1">
                        {r.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < r.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-justify leading-relaxed">
                    {r.description}
                  </p>

                  <Divider className="my-2.5" />

                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-neutral-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-neutral-700">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-black dark:text-white" />
              <p className="text-black dark:text-white text-lg font-medium">
                Không tìm thấy đánh giá nào
              </p>
              <p className="text-sm mt-2">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          )}
        </div>
      </section>

      <Divider className="my-10" />
    </article>
  );
}
