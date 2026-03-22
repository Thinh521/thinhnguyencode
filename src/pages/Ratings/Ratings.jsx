import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import { db, auth } from "../../firebaseConfig";
import {
  Star,
  Users,
  Clock,
  Search,
  Filter,
  MessageSquare,
  Send,
  X,
  User,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .ratings-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Input */
    .field-input {
      width: 100%; border-radius: 12px;
      padding: 11px 16px; color: white;
      font-family: 'Syne', sans-serif; font-size: 0.88rem;
      outline: none; resize: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    }
    .field-input:focus {
      border-color: rgba(249,115,22,0.5);
      background: rgba(249,115,22,0.04);
      box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
    }
    .field-input.has-error { border-color: rgba(239,68,68,0.5); }
    .field-input.has-error:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }

    /* Select */
    .field-select {
      appearance: none; cursor: pointer;
      background-color: rgba(255,255,255,0.03) !important;
    }
    .field-select option { background: #1a1a1a; color: white; }

    /* Submit button */
    .submit-btn {
      width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px;
      padding: 12px 24px; border-radius: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
 color: white; cursor: pointer;
      transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
    }
    .submit-btn:hover:not(:disabled) {
      background: rgba(249,115,22,0.26);
      box-shadow: 0 0 28px rgba(249,115,22,0.2);
    }
    .submit-btn:active:not(:disabled) { transform: scale(0.99); }
    .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }

    /* Section rule */
    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }

    /* Review card */
    .review-card {
      border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
      background: rgba(255,255,255,0.02);
      transition: border-color 0.25s, background 0.25s;
    }
    .review-card:hover {
      border-color: rgba(249,115,22,0.2);
      background: rgba(249,115,22,0.02);
    }

    /* Star bar */
    .star-bar-track {
      flex: 1; height: 6px; border-radius: 99px; overflow: hidden;
    }
    .star-bar-fill {
      height: 100%; border-radius: 99px;
      background: linear-gradient(to right, #f97316, #fbbf24);
      transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
    }

    /* Search ring */
    .search-ring:focus-within {
      outline: 2px solid #f97316; outline-offset: 0;
    }

    /* Skeleton shimmer */
    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
    .skeleton {
      background: linear-gradient(90deg,
        rgba(255,255,255,0.04) 25%,
        rgba(255,255,255,0.08) 50%,
        rgba(255,255,255,0.04) 75%);
      background-size: 600px 100%;
      animation: shimmer 1.4s infinite linear;
      border-radius: 8px;
    }

    /* Spin */
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Active filter pill */
    .filter-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 12px; border-radius: 99px;
      font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
      letter-spacing: 0.1em; text-transform: uppercase;
      background: rgba(249,115,22,0.1);
      border: 1px solid rgba(249,115,22,0.3); color: #f97316;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const STAR_LABELS = ["", "Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời!"];
const randomAvatar = () =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.floor(Math.random() * 10000)}`;

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ icon: Icon, children, count }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <Icon size={12} className="text-orange-400" />
        </div>
      )}
      <h2 className="font-mono-code text-[0.62rem] text-black dark:text-white tracking-[0.18em] uppercase">
        {children}
      </h2>
      {count !== undefined && (
        <span
          className="font-mono-code text-[0.58rem] px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
            color: "#f97316",
          }}
        >
          {count}
        </span>
      )}
      <div className="flex-1 section-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAR PICKER
───────────────────────────────────────────── */
function StarPicker({ star, hoverStar, onSet, onHover, error }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Star size={12} style={{ color: "rgba(249,115,22,0.7)" }} />
        <label className="font-mono-code text-[0.62rem] text-black dark:text-white tracking-[0.14em] uppercase">
          Mức độ hài lòng
        </label>
      </div>

      <div className="flex flex-col items-center gap-3 p-5 mb-4 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.button
              key={s}
              type="button"
              onClick={() => onSet(s)}
              onMouseEnter={() => onHover(s)}
              onMouseLeave={() => onHover(0)}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Star
                size={32}
                className={`transition-all duration-150 ${
                  s <= (hoverStar || star)
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    : "fill-transparent text-neutral-400"
                }`}
              />
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={hoverStar || star}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className={`font-mono-code text-[0.65rem] tracking-wider ${
              star > 0
                ? "text-amber-400"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {STAR_LABELS[hoverStar || star] || "Nhấn để chọn số sao"}
          </motion.p>
        </AnimatePresence>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono-code text-[0.6rem] mt-1.5 flex items-center gap-1"
          style={{ color: "rgba(239,68,68,0.8)" }}
        >
          ✕ {error.message}
        </motion.p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FORM FIELD
───────────────────────────────────────────── */
function FormField({
  label,
  name,
  register,
  errors,
  type = "text",
  icon: Icon = User,
}) {
  const error = errors?.[name];
  const reg = register
    ? register(name, { required: `${label} là bắt buộc` })
    : {};

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} style={{ color: "rgba(249,115,22,0.7)" }} />
        <label className="font-mono-code text-[0.62rem] text-black dark:text-white tracking-[0.14em] uppercase">
          {label}
        </label>
      </div>
      {type === "textarea" ? (
        <textarea
          {...reg}
          rows={4}
          className={`field-input bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 ${error ? "has-error" : ""}`}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          {...reg}
          className={`field-input bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 ${error ? "has-error" : ""}`}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono-code text-[0.6rem] mt-1.5 flex items-center gap-1"
            style={{ color: "rgba(239,68,68,0.8)" }}
          >
            ✕ {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS CARD
───────────────────────────────────────────── */
function StatsSection({ averageRating, totalRatings, getStarPct }) {
  return (
    <div className="p-6 rounded-2xl mb-8 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
        {/* Left: big score */}
        <div className="flex flex-col items-center text-center min-w-[140px]">
          <div className="flex items-end gap-2 mb-2">
            <span className="font-serif-display text-6xl text-black dark:text-white leading-none">
              {averageRating.toFixed(1)}
            </span>
            <span className="font-mono-code text-[0.65rem] tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              / 5.0
            </span>
          </div>

          {/* Stars row */}
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                style={{
                  color:
                    i < Math.round(averageRating)
                      ? "#fbbf24"
                      : "rgba(255,255,255,0.1)",
                  fill:
                    i < Math.round(averageRating) ? "#fbbf24" : "transparent",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Users
              size={11}
              className=" text-neutral-500 dark:text-neutral-400"
            />
            <span className="font-mono-code text-[0.58rem] tracking-widest text-neutral-500 dark:text-neutral-400">
              {totalRatings} đánh giá
            </span>
          </div>
        </div>

        {/* Right: bar chart */}
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12 shrink-0">
                <span className="font-mono-code text-[0.65rem] text-black dark:text-white">
                  {n}
                </span>
                <Star size={10} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
              </div>

              <div className="star-bar-track bg-neutral-200 dark:bg-neutral-600">
                <motion.div
                  className="star-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${getStarPct(n)}%` }}
                  transition={{
                    delay: 0.2 + (5 - n) * 0.06,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span className="font-mono-code text-[0.6rem] w-9 text-right shrink-0 text-neutral-500 dark:text-neutral-400">
                {getStarPct(n)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────────── */
function ReviewCard({ r, index }) {
  const date = r.createdAt?.seconds
    ? new Date(r.createdAt.seconds * 1000)
    : new Date(r.createdAt?.toDate?.() || r.createdAt);
  const formatted = date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="review-card p-5"
    >
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full overflow-hidden shrink-0"
          style={{
            border: "1.5px solid rgba(249,115,22,0.25)",
            background: "#111",
          }}
        >
          <img
            src={r.avatar}
            alt={r.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + stars */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p
              className="text-white font-semibold text-sm leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {r.name}
            </p>
            <div className="flex gap-0.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  style={{
                    color: i < r.rating ? "#fbbf24" : "rgba(255,255,255,0.1)",
                    fill: i < r.rating ? "#fbbf24" : "transparent",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={10} style={{ color: "rgba(255,255,255,0.25)" }} />
            <span
              className="font-mono-code text-[0.56rem] tracking-wide"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {formatted}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px mb-3"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      <p
        className="text-sm leading-relaxed text-justify"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {r.description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SKELETON
───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="review-card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-11 h-11 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-2 w-1/4 rounded" />
        </div>
      </div>
      <div className="skeleton h-px w-full" />
      <div className="space-y-1.5">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-4/6 rounded" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */
function EmptyState({ hasFilter, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-5xl mb-4 select-none">💬</div>
      <p
        className="font-mono-code text-[0.7rem] tracking-widest uppercase mb-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {hasFilter ? "Không tìm thấy đánh giá" : "Chưa có đánh giá nào"}
      </p>
      {hasFilter && (
        <button
          onClick={onReset}
          className="font-mono-code text-[0.6rem] text-orange-400 hover:text-orange-300 transition mt-3 flex items-center gap-1 tracking-wider uppercase"
        >
          <X size={10} /> Xoá bộ lọc
        </button>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
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
  const [fetching, setFetching] = useState(true);

  const ratingsRef = collection(db, "ratings");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) setUserId(u.uid);
    });
  }, []);

  const fetchRatings = async () => {
    setFetching(true);
    const snap = await getDocs(query(ratingsRef, orderBy("createdAt", "desc")));
    const data = snap.docs.map((d) => d.data());
    setRatings(data);
    setFilteredRatings(data);
    if (data.length > 0) {
      const avg = data.reduce((s, r) => s + Number(r.rating), 0) / data.length;
      setAverageRating(Number(avg.toFixed(1)));
      setTotalRatings(data.length);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  useEffect(() => {
    let f = ratings;
    if (filterStar > 0) f = f.filter((r) => r.rating === filterStar);
    if (searchTerm)
      f = f.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    setFilteredRatings(f);
  }, [searchTerm, filterStar, ratings]);

  const getStarPct = (n) => {
    if (!totalRatings) return 0;
    return (
      (ratings.filter((r) => r.rating === n).length / totalRatings) *
      100
    ).toFixed(0);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(ratingsRef, {
        name: data.name,
        rating: star,
        description: data.description,
        avatar: randomAvatar(),
        createdAt: serverTimestamp(),
        userId,
      });
      await fetchRatings();
      reset();
      setStar(0);
      toast.success("Cảm ơn bạn! Đánh giá đã được gửi.");
    } catch (e) {
      console.error(e);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const hasFilter = searchTerm || filterStar > 0;

  return (
    <article className="ratings-root min-h-screend pb-16">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="pt-10 pb-6 max-w-5xl mx-auto"
      >
        <p className="font-mono-code text-orange-400 text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-orange-400" />
          Reviews / Đánh giá
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-5xl md:text-6xl text-black dark:text-white  leading-none mb-2">
              Đánh giá<span className="text-orange-500">.</span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400  text-sm">
              Chia sẻ cảm nhận của bạn về sản phẩm
            </p>
          </div>
          <span className="font-serif-display text-[5rem] text-white/4 leading-none select-none hidden sm:block">
            {String(totalRatings).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-orange-500 via-orange-400/30 to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* ── MAIN GRID: form + stats ── */}
        <div className="grid md:grid-cols-[1fr_1.05fr] gap-10 items-start">
          {/* LEFT: FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <SectionLabel icon={Star}>Gửi đánh giá</SectionLabel>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
              <FormField
                label="Họ và tên"
                name="name"
                register={register}
                errors={errors}
                icon={User}
              />

              <StarPicker
                star={star}
                hoverStar={hoverStar}
                onSet={(s) => {
                  setStar(s);
                  setValue("star", s, { shouldValidate: true });
                }}
                onHover={setHoverStar}
                error={errors.star}
              />
              <input
                type="hidden"
                {...register("star", {
                  required: "Vui lòng chọn ít nhất 1 sao!",
                  min: { value: 1, message: "Vui lòng chọn ít nhất 1 sao!" },
                })}
                value={star}
              />

              <FormField
                label="Mô tả cảm nhận"
                name="description"
                type="textarea"
                register={register}
                errors={errors}
                icon={MessageSquare}
              />

              <button
                type="submit"
                disabled={loading}
                className="submit-btn mt-2 bg-orange-400 border-orange-400"
              >
                {loading ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white/20"
                      style={{
                        borderTopColor: "#f97316",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    {" "}
                    <Send size={13} /> Gửi đánh giá{" "}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* RIGHT: STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            <SectionLabel icon={Users}>Thống kê</SectionLabel>
            <StatsSection
              averageRating={averageRating}
              totalRatings={totalRatings}
              getStarPct={getStarPct}
            />
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="section-rule" />

        {/* ── REVIEWS LIST ── */}
        <section>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <SectionLabel icon={MessageSquare} count={filteredRatings.length}>
              Tất cả đánh giá
            </SectionLabel>
          </div>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mb-5"
          >
            {/* Search */}
            <div className="search-ring relative flex items-center gap-3 px-4 py-2.5 rounded-xl flex-1 transition-all bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50">
              <Search size={14} className="text-neutral-500 shrink-0" />
              <input
                type="text"
                placeholder="Tìm tên hoặc nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 outline-none text-white"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:text-white transition"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Star select */}
            <div className="relative min-w-[160px]">
              <Filter
                size={12}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none"
              />
              <ChevronDown
                size={12}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
              <select
                value={filterStar}
                onChange={(e) => setFilterStar(Number(e.target.value))}
                className="field-input field-select w-full pl-9 pr-9 py-2.5"
                style={{ cursor: "pointer" }}
              >
                <option value={0}>Tất cả sao</option>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} sao
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Active filter chips */}
          <AnimatePresence>
            {hasFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 flex-wrap mb-4 overflow-hidden"
              >
                <span
                  className="font-mono-code text-[0.58rem] tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Đang lọc:
                </span>
                {searchTerm && (
                  <span className="filter-pill">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm("")}>
                      <X size={9} />
                    </button>
                  </span>
                )}
                {filterStar > 0 && (
                  <span className="filter-pill">
                    {filterStar} sao
                    <button onClick={() => setFilterStar(0)}>
                      <X size={9} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStar(0);
                  }}
                  className="font-mono-code text-[0.58rem] tracking-wider uppercase flex items-center gap-1 hover:text-orange-400 transition"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  <X size={9} /> Xoá tất cả
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cards */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {fetching ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={`sk-${i}`} />
                ))
              ) : filteredRatings.length === 0 ? (
                <EmptyState
                  key="empty"
                  hasFilter={!!hasFilter}
                  onReset={() => {
                    setSearchTerm("");
                    setFilterStar(0);
                  }}
                />
              ) : (
                filteredRatings.map((r, i) => (
                  <ReviewCard key={`${r.userId}-${i}`} r={r} index={i} />
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </article>
  );
}
