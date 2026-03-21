import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Volume2,
  VolumeX,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useViewedStories from "../../../hooks/useViewedStories";

/* ─────────────────────────────────────────────
   LOCAL STORAGE
───────────────────────────────────────────── */
const STORAGE_KEY = "storyLikes";
const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};
const writeStore = (d) => localStorage.setItem(STORAGE_KEY, JSON.stringify(d));

/* ─────────────────────────────────────────────
   PROGRESS BAR SEGMENTS
───────────────────────────────────────────── */
function ProgressSegments({ total, current, progress }) {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-full overflow-hidden"
          style={{ height: "2.5px", background: "rgba(255,255,255,0.2)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, #fff, rgba(255,255,255,0.85))",
              width:
                i < current ? "100%" : i === current ? `${progress}%` : "0%",
              transition: i === current ? "width 0.1s linear" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const StoryViewer = ({ storyList = [], onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [heartBurst, setHeartBurst] = useState(false); // double-tap burst
  const [tapSide, setTapSide] = useState(null); // "left" | "right" flash

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const touch = useRef({ startX: 0, startY: 0, startTime: 0 });
  const lastTapRef = useRef(0);

  const { markAsViewed } = useViewedStories();
  const story = useMemo(
    () => storyList[currentIndex],
    [storyList, currentIndex],
  );

  /* ── Go to index ── */
  const goTo = useCallback(
    (n) => {
      if (n < 0) {
        onClose();
        return;
      }
      if (n >= storyList.length) {
        onClose();
        return;
      }
      setCurrentIndex(n);
    },
    [storyList.length, onClose],
  );

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Mark viewed + load likes ── */
  useEffect(() => {
    if (!story) return;
    markAsViewed(story.id);

    const store = readStore();
    if (!store[story.id]) {
      store[story.id] = {
        liked: false,
        count: Math.floor(Math.random() * 200) + 5,
      };
      writeStore(store);
    }
    setLiked(store[story.id].liked);
    setLikeCount(store[story.id].count);
  }, [story?.id, markAsViewed]);

  /* ── Sync mute ── */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  /* ── Progress timer ── */
  useEffect(() => {
    if (!story) return;
    clearInterval(intervalRef.current);
    setProgress(0);
    setIsLoading(true);

    const isVideo = !!(story.type === "video" || story.video);
    const video = videoRef.current;

    const startProgress = (durationMs) => {
      const tick = durationMs / 100;
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            goTo(currentIndex + 1);
            return 0;
          }
          return p + 1;
        });
      }, tick);
    };

    if (isVideo && video) {
      const onLoaded = () => {
        setIsLoading(false);
        const dur = video.duration ? video.duration * 1000 : 10000;
        startProgress(dur);
        video.play().catch(() => {});
      };
      const onEnd = () => goTo(currentIndex + 1);

      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("ended", onEnd);
      video.load();

      return () => {
        video.pause();
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("ended", onEnd);
        clearInterval(intervalRef.current);
      };
    } else {
      // image: fake load then start
      const t = setTimeout(() => {
        setIsLoading(false);
        startProgress(8000);
      }, 200);
      return () => {
        clearTimeout(t);
        clearInterval(intervalRef.current);
      };
    }
  }, [story?.id, currentIndex]);

  /* ── Like ── */
  const handleLike = useCallback(
    (e) => {
      e?.stopPropagation();
      const store = readStore();
      const entry = store[story.id] || { liked: false, count: 0 };
      entry.liked = !entry.liked;
      entry.count = entry.liked
        ? entry.count + 1
        : Math.max(0, entry.count - 1);
      store[story.id] = entry;
      writeStore(store);
      setLiked(entry.liked);
      setLikeCount(entry.count);
      if (entry.liked) {
        setHeartBurst(true);
        setTimeout(() => setHeartBurst(false), 700);
      }
    },
    [story?.id],
  );

  /* ── Touch ── */
  const onTouchStart = useCallback((e) => {
    const t = e.changedTouches[0];
    touch.current = {
      startX: t.clientX,
      startY: t.clientY,
      startTime: Date.now(),
    };
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      const t = e.changedTouches[0];
      const dx = touch.current.startX - t.clientX;
      const dy = touch.current.startY - t.clientY;
      const dt = Date.now() - touch.current.startTime;
      const now = Date.now();
      const isSwipe = Math.abs(dx) > 50 || Math.abs(dy) > 50;

      if (!isSwipe && dt < 250) {
        // Double-tap → like
        if (now - lastTapRef.current < 300) {
          handleLike();
          return;
        }
        lastTapRef.current = now;
      }

      if (Math.abs(dy) > Math.abs(dx) && dy > 60) {
        onClose();
        return;
      }
      if (Math.abs(dx) > 50) {
        if (dx > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    },
    [currentIndex, goTo, onClose, handleLike],
  );

  /* ── Click tap zones ── */
  const handleTapZone = useCallback(
    (side, e) => {
      e.stopPropagation();
      setTapSide(side);
      setTimeout(() => setTapSide(null), 250);
      if (side === "left") goTo(currentIndex - 1);
      else goTo(currentIndex + 1);
    },
    [currentIndex, goTo],
  );

  if (!story) return null;

  const isVideo = !!(story.type === "video" || story.video);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
    >
      {/* ── Adjacent story previews (desktop) ── */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-4 xl:left-16 z-40 hidden md:flex items-center gap-2 group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <ChevronLeft
              size={18}
              className="text-white group-hover:text-orange-400 transition"
            />
          </div>
        </motion.button>
      )}
      {currentIndex < storyList.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-4 xl:right-16 z-40 hidden md:flex items-center gap-2 group"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <ChevronRight
              size={18}
              className="text-white group-hover:text-orange-400 transition"
            />
          </div>
        </motion.button>
      )}

      {/* ── STORY CARD ── */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden select-none"
        style={{
          width: "min(96vw, 400px)",
          height: "min(92vh, 710px)",
          borderRadius: "20px",
          background: "#0a0a0a",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── MEDIA ── */}
        <AnimatePresence mode="wait">
          {isVideo ? (
            <video
              key={`v-${story.id}`}
              ref={videoRef}
              src={`/thinhnguyencode/videos/${story.video}`}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted={isMuted}
              style={{ zIndex: 0 }}
            />
          ) : (
            <motion.img
              key={`i-${story.id}`}
              src={`/thinhnguyencode/images/${story.image}`}
              alt="story"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
              onLoad={() => setIsLoading(false)}
            />
          )}
        </AnimatePresence>

        {/* ── LOADING SPINNER ── */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ background: "rgba(0,0,0,0.4)" }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-orange-400/30"
                style={{
                  borderTopColor: "#f97316",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TAP ZONES (left / right) ── */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer"
          onClick={(e) => handleTapZone("left", e)}
        >
          <AnimatePresence>
            {tapSide === "left" && (
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 rounded-l-[20px]"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
            )}
          </AnimatePresence>
        </div>
        <div
          className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer"
          onClick={(e) => handleTapZone("right", e)}
        >
          <AnimatePresence>
            {tapSide === "right" && (
              <motion.div
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 rounded-r-[20px]"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* ── TOP: PROGRESS + HEADER ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-3 pt-3 space-y-3">
          <ProgressSegments
            total={storyList.length}
            current={currentIndex}
            progress={progress}
          />

          {/* User row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Avatar */}
              <div
                className="w-8 h-8 rounded-full overflow-hidden shrink-0"
                style={{
                  border: "1.5px solid rgba(249,115,22,0.7)",
                  boxShadow: "0 0 8px rgba(249,115,22,0.3)",
                }}
              >
                <video
                  src={`/thinhnguyencode/videos/${story.video}`}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.8)" }}
                />
              </div>

              <div>
                <p
                  className="text-white text-xs font-semibold leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {story.username}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {isVideo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted((m) => !m);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {isMuted ? (
                    <VolumeX size={14} className="text-white/60" />
                  ) : (
                    <Volume2 size={14} className="text-white/60" />
                  )}
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(6px)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(249,115,22,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(0,0,0,0.4)")
                }
              >
                <X size={14} className="text-white/70" />
              </button>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: LIKE ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-5 flex items-end justify-between"
          style={{ pointerEvents: "none" }}
        >
          {/* Story title/caption if any */}
          <div style={{ flex: 1 }}>
            {story.caption && (
              <p
                className="text-white text-sm leading-snug line-clamp-2"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}
              >
                {story.caption}
              </p>
            )}
          </div>

          {/* Like button */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 ml-3 shrink-0 transition-transform active:scale-90"
            style={{ pointerEvents: "all" }}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Heart
                size={24}
                className="transition-colors duration-200"
                style={{
                  color: liked ? "#ef4444" : "rgba(255,255,255,0.7)",
                  fill: liked ? "#ef4444" : "transparent",
                  filter: liked
                    ? "drop-shadow(0 0 6px rgba(239,68,68,0.6))"
                    : "none",
                  strokeWidth: 1.8,
                }}
              />
            </motion.div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.06em",
                color: liked ? "#ef4444" : "rgba(255,255,255,0.4)",
              }}
            >
              {likeCount}
            </span>
          </button>
        </div>

        {/* ── DOUBLE-TAP HEART BURST ── */}
        <AnimatePresence>
          {heartBurst && (
            <motion.div
              key="burst"
              initial={{ opacity: 1, scale: 0.4, y: 0 }}
              animate={{ opacity: 0, scale: 1.6, y: -60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="absolute left-1/2 bottom-1/3 pointer-events-none z-30"
              style={{ transform: "translateX(-50%)" }}
            >
              <Heart
                size={64}
                style={{
                  color: "#ef4444",
                  fill: "#ef4444",
                  filter: "drop-shadow(0 0 16px rgba(239,68,68,0.8))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CSS for spinner ── */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </motion.div>
  );
};

export default StoryViewer;
