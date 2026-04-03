import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/* ─── localStorage helpers ─── */
const getLiked = () => {
  try {
    return JSON.parse(localStorage.getItem("likedPhotos")) || [];
  } catch {
    return [];
  }
};
const saveLiked = (arr) =>
  localStorage.setItem("likedPhotos", JSON.stringify(arr));

/* ─── Normalise images field: string | string[] → string[] ─── */
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") return [val];
  return [];
};

const PhotoModal = ({ photo, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liking, setLiking] = useState(false);

  const images = toArray(photo?.images);

  /* reset khi mở ảnh mới */
  useEffect(() => {
    if (!photo) return;
    setCurrent(0);
    setLikes(photo.likes ?? 0);
    setLiked(getLiked().includes(photo.id));
  }, [photo?.id]);

  /* keyboard nav */
  useEffect(() => {
    if (!photo) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setCurrent((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setCurrent((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onClose, images.length]);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = photo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [photo]);

  if (!photo) return null;

  /* ── Like / Unlike ── */
  const handleLike = async (e) => {
    e.stopPropagation();
    if (liking) return;
    setLiking(true);

    const already = getLiked().includes(photo.id);

    try {
      if (already) {
        await updateDoc(doc(db, "photosData", photo.id), {
          likes: increment(-1),
        });
        saveLiked(getLiked().filter((id) => id !== photo.id));
        setLiked(false);
        setLikes((l) => Math.max(0, l - 1));
      } else {
        await updateDoc(doc(db, "photosData", photo.id), {
          likes: increment(1),
        });
        saveLiked([...getLiked(), photo.id]);
        setLiked(true);
        setLikes((l) => l + 1);
      }
    } catch (err) {
      console.error("Like error:", err);
    } finally {
      setLiking(false);
    }
  };

  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          key="box"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative px-4 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── IMAGE FRAME ── */}
          <div className="relative inline-block rounded-xl overflow-hidden">
            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`${photo.title} ${current + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block max-h-[80vh] w-auto"
                style={{ maxWidth: "88vw" }}
              />
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto z-10">
              <p className="text-sm font-semibold text-white leading-tight mb-1">
                {photo.title}
              </p>
              {photo.description && (
                <p className="text-xs text-white/55 leading-relaxed line-clamp-2 mb-1.5">
                  {photo.description}
                </p>
              )}
              {photo.category?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {photo.category.map((cat) => (
                    <span
                      key={cat}
                      className="font-mono text-[0.52rem] tracking-widest uppercase text-white/50"
                    >
                      #{cat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── CLOSE ── */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center
                bg-black/45 backdrop-blur-sm border border-white/10 hover:bg-black/70 text-white transition-all duration-200"
            >
              <X size={14} />
            </button>

            {/* ── LIKE BUTTON ── */}
            <button
              onClick={handleLike}
              disabled={liking}
              className="absolute top-[3.25rem] right-3 z-20 flex flex-col items-center gap-1 disabled:opacity-60"
            >
              {/* ICON */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-200
    ${
      liked
        ? "bg-red-500/20 border-red-500/50"
        : "bg-black/55 border-white/10 hover:bg-black/75"
    }`}
              >
                <motion.div
                  animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Heart
                    size={14}
                    style={{
                      color: liked ? "#ef4444" : "#fff",
                      fill: liked ? "#ef4444" : "transparent",
                      strokeWidth: 1.8,
                    }}
                  />
                </motion.div>
              </div>

              {/* TEXT nằm ngoài */}
              <motion.span
                key={likes}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[0.58rem] tracking-wide leading-none"
                style={{
                  color: liked ? "#ef4444" : "#fff",
                }}
              >
                {likes}
              </motion.span>
            </button>

            {/* ── PREV / NEXT ── */}
            {hasPrev && (
              <button
                onClick={() => setCurrent((i) => i - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                  w-8 h-8 rounded-full flex items-center justify-center
                  bg-black/55 backdrop-blur-sm border border-white/10
                  text-white/65 hover:text-white hover:bg-black/75 transition-all duration-200"
              >
                <ChevronLeft size={15} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={() => setCurrent((i) => i + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                  w-8 h-8 rounded-full flex items-center justify-center
                  bg-black/55 backdrop-blur-sm border border-white/10
                  text-white/65 hover:text-white hover:bg-black/75 transition-all duration-200"
              >
                <ChevronRight size={15} />
              </button>
            )}

            {/* Counter */}
            {images.length > 0 && (
              <div className="absolute bottom-3 right-4 z-20 font-mono text-[0.54rem] tracking-widest text-white/35 tabular-nums">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </div>
            )}
          </div>

          {/* ── THUMBNAIL STRIP ── */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {images.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  animate={{ width: current === i ? 20 : 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="rounded-full transition-colors duration-200"
                  style={{
                    height: "6px",
                    background:
                      current === i ? "#f97316" : "rgba(255,255,255,0.22)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoModal;
