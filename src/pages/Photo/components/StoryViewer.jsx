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
import { subscribeStories } from "../../../api/storiesApi";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/* ─────────────────────────────────────────────
   LIKE STORAGE  (track which stories this device liked)
───────────────────────────────────────────── */
const LIKED_KEY = "storyLikedIds";
const getLikedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(LIKED_KEY)) || [];
  } catch {
    return [];
  }
};
const saveLikedIds = (ids) =>
  localStorage.setItem(LIKED_KEY, JSON.stringify(ids));

/* ─────────────────────────────────────────────
   PROGRESS SEGMENTS
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
          <div
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
   MAIN
───────────────────────────────────────────── */
const StoryViewer = ({ storyList = [], onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heartBurst, setHeartBurst] = useState(false);
  const [tapSide, setTapSide] = useState(null);
  const [liking, setLiking] = useState(false); // debounce
  /* realtime stories from Firestore — used to show live like count */
  const [rtStories, setRtStories] = useState([]);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const touch = useRef({ startX: 0, startY: 0, startTime: 0 });
  const lastTapRef = useRef(0);

  const { markAsViewed } = useViewedStories();

  /* ── Subscribe to Firestore realtime ── */
  useEffect(() => {
    const unsub = subscribeStories(setRtStories);
    return () => unsub();
  }, []);

  /* ── Merge storyList prop with realtime likes ──
       storyList comes from parent (may be stale),
       rtStories has live likes field.
       We display the story from storyList but read likes from rtStories.
  ── */
  const story = useMemo(() => {
    const base = storyList[currentIndex];
    if (!base) return null;
    const live = rtStories.find((s) => s.docId === base.docId);
    return live ? { ...base, likes: live.likes ?? 0 } : base;
  }, [storyList, currentIndex, rtStories]);

  /* ── Is this story liked by this device? ── */
  const liked = useMemo(
    () => (story ? getLikedIds().includes(story.docId) : false),
    // Re-derive when story changes. The state is in localStorage so we
    // force a re-render after every like/unlike via a local counter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [story?.docId, liking],
  );

  /* ── Go to index ── */
  const goTo = useCallback(
    (n) => {
      if (n < 0 || n >= storyList.length) {
        onClose();
        return;
      }
      setCurrentIndex(n);
    },
    [storyList.length, onClose],
  );

  /* ── Scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Mark viewed ── */
  useEffect(() => {
    if (story) markAsViewed(story.id ?? story.docId);
  }, [story?.docId, markAsViewed]);

  /* ── Sync mute to video ── */
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
        startProgress(video.duration ? video.duration * 1000 : 10000);
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
      const t = setTimeout(() => {
        setIsLoading(false);
        startProgress(8000);
      }, 200);
      return () => {
        clearTimeout(t);
        clearInterval(intervalRef.current);
      };
    }
  }, [story?.docId, currentIndex]);

  /* ── Like / Unlike ── */
  const handleLike = useCallback(
    async (e) => {
      e?.stopPropagation();
      if (!story?.docId || liking) return;

      const alreadyLiked = getLikedIds().includes(story.docId);
      setLiking(true); // triggers re-derive of `liked`

      try {
        await updateDoc(doc(db, "storiesData", story.docId), {
          likes: increment(alreadyLiked ? -1 : 1),
        });

        if (alreadyLiked) {
          saveLikedIds(getLikedIds().filter((id) => id !== story.docId));
        } else {
          saveLikedIds([...getLikedIds(), story.docId]);
          /* show heart burst only when liking */
          setHeartBurst(true);
          setTimeout(() => setHeartBurst(false), 700);
        }
      } catch (err) {
        console.error("Like error:", err);
      } finally {
        setLiking(false);
      }
    },
    [story?.docId, liking],
  );

  /* ── Touch handlers ── */
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
        dx > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
      }
    },
    [currentIndex, goTo, onClose, handleLike],
  );

  /* ── Tap zones ── */
  const handleTapZone = useCallback(
    (side, e) => {
      e.stopPropagation();
      setTapSide(side);
      setTimeout(() => setTapSide(null), 250);
      side === "left" ? goTo(currentIndex - 1) : goTo(currentIndex + 1);
    },
    [currentIndex, goTo],
  );

  if (!story) return null;

  const isVideo = !!(story.type === "video" || story.video);
  const displayLikes = story.likes ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
    >
      {/* Desktop prev/next */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-4 xl:left-16 z-40 hidden md:flex"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group"
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
          className="absolute right-4 xl:right-16 z-40 hidden md:flex"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group"
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
        {/* Media */}
        <AnimatePresence mode="wait">
          {isVideo ? (
            <video
              key={`v-${story.docId}`}
              ref={videoRef}
              src={story.video}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
              autoPlay
              playsInline
              muted={isMuted}
            />
          ) : (
            <motion.img
              key={`i-${story.docId}`}
              src={story.image}
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

        {/* Loading spinner */}
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

        {/* Tap zones */}
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

        {/* ── TOP BAR ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-3 pt-3 space-y-3">
          <ProgressSegments
            total={storyList.length}
            current={currentIndex}
            progress={progress}
          />

          <div className="flex justify-between items-start">
            {/* Avatar + username */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full overflow-hidden shrink-0"
                style={{
                  border: "1.5px solid rgba(249,115,22,0.7)",
                  boxShadow: "0 0 8px rgba(249,115,22,0.3)",
                }}
              >
                <video
                  src={story.video}
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
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {story.username}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col items-center gap-2.5">
              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-all duration-200"
              >
                <X size={14} className="text-white" />
              </button>

              {/* Mute */}
              {isVideo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted((m) => !m);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-all duration-200"
                >
                  {isMuted ? (
                    <VolumeX size={14} className="text-white" />
                  ) : (
                    <Volume2 size={14} className="text-white" />
                  )}
                </button>
              )}

              {/* Like */}
              <button
                onClick={handleLike}
                disabled={liking}
                className="flex flex-col items-center gap-1 group disabled:opacity-70"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-200
                  ${
                    liked
                      ? "bg-red-500/20 border-red-400/40"
                      : "bg-black/45 border-white/10 hover:bg-black/70"
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
                        filter: liked
                          ? "drop-shadow(0 0 4px rgba(239,68,68,0.6))"
                          : "none",
                        strokeWidth: 1.8,
                      }}
                    />
                  </motion.div>
                </div>

                {/* Live count — updates in realtime from Firestore */}
                <motion.span
                  key={displayLikes}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.05em",
                    color: liked ? "#ef4444" : "#fff",
                    lineHeight: 1,
                  }}
                >
                  {displayLikes}
                </motion.span>
              </button>
            </div>
          </div>
        </div>

        {/* Double-tap heart burst */}
        <AnimatePresence>
          {heartBurst && (
            <motion.div
              key="burst"
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{ opacity: 0, scale: 1.7, y: -70 }}
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
                  filter: "drop-shadow(0 0 18px rgba(239,68,68,0.85))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </motion.div>
  );
};

export default StoryViewer;
