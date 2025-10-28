import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { X, Volume2, VolumeX, Heart } from "lucide-react";

import useViewedStories from "../../hooks/useViewedStories";

const STORAGE_KEY = "storyLikes";

// LocalStorage helpers
const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const writeStore = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const StoryViewer = ({ storyList = [], onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const touch = useRef({ startX: 0, startY: 0 });

  const { markAsViewed } = useViewedStories();
  const story = useMemo(
    () => storyList[currentIndex],
    [storyList, currentIndex]
  );

  // Đánh dấu đã xem khi đổi story
  useEffect(() => {
    markAsViewed(story.id);
  }, [story.id]);

  // Khóa scroll body
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  // Load trạng thái like (chỉ khi đổi story)
  useEffect(() => {
    const store = readStore();
    if (!store[story.id]) {
      store[story.id] = {
        liked: false,
        count: Math.floor(Math.random() * 200) + 5,
      };
      writeStore(store);
    }
    setLiked(store[story.id].liked);
  }, [story.id]);

  // Cập nhật muted video nếu thay đổi
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Cập nhật tiến trình story (ảnh & video)
  useEffect(() => {
    if (!story) return;

    clearInterval(intervalRef.current);
    setProgress(0);
    setIsLoading(true);

    const isVideo = !!(story.type === "video" || story.video);
    const video = videoRef.current;

    const startProgress = (durationMs) => {
      const tickTime = durationMs / 50;
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(intervalRef.current);
            setCurrentIndex((prev) => Math.min(prev + 1, storyList.length - 1));
            return 0;
          }
          return p + 2;
        });
      }, tickTime);
    };

    if (isVideo && video) {
      const handleLoaded = () => {
        setIsLoading(false);
        const duration = video.duration ? video.duration * 1000 : 10000;
        startProgress(duration);
        video.play().catch(() => {});
      };

      const handleEnd = () =>
        setCurrentIndex((prev) => Math.min(prev + 1, storyList.length - 1));

      video.addEventListener("loadedmetadata", handleLoaded);
      video.addEventListener("ended", handleEnd);
      video.load();

      return () => {
        video.pause();
        video.removeEventListener("loadedmetadata", handleLoaded);
        video.removeEventListener("ended", handleEnd);
        clearInterval(intervalRef.current);
      };
    } else {
      startProgress(10000);
    }

    return () => clearInterval(intervalRef.current);
  }, [story.id]);

  // Xử lý like
  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      const store = readStore();
      const entry = store[story.id] || { liked: false, count: 0 };

      entry.liked = !entry.liked;
      entry.count = entry.liked
        ? entry.count + 1
        : Math.max(0, entry.count - 1);

      store[story.id] = entry;
      writeStore(store);
      setLiked(entry.liked);
    },
    [story.id]
  );

  // Xử lý touch
  const handleTouchStart = useCallback((e) => {
    const t = e.changedTouches[0];
    touch.current = { startX: t.clientX, startY: t.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const t = e.changedTouches[0];
      const distX = touch.current.startX - t.clientX;
      const distY = touch.current.startY - t.clientY;
      const threshold = 50;

      if (Math.abs(distY) > Math.abs(distX)) {
        if (distY < -threshold) onClose();
      } else {
        if (distX > threshold)
          setCurrentIndex((i) => Math.min(i + 1, storyList.length - 1));
        else if (distX < -threshold) setCurrentIndex((i) => Math.max(i - 1, 0));
      }
    },
    [onClose, storyList.length]
  );

  // Click next/prev
  const handleClick = useCallback(
    (e) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      setCurrentIndex((i) =>
        x < width / 2
          ? Math.max(i - 1, 0)
          : Math.min(i + 1, storyList.length - 1)
      );
    },
    [storyList.length]
  );

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div
        className="relative w-[95vw] max-w-[400px] h-[90vh] bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-12 h-12 relative rotate-45">
              {[0, 0.15, 0.3, 0.45].map((d, i) => (
                <div
                  key={i}
                  className="absolute bg-white w-5 h-5 animate-ping"
                  style={{
                    top: i < 2 ? 0 : "auto",
                    bottom: i >= 2 ? 0 : "auto",
                    left: i % 3 === 0 ? 0 : "auto",
                    right: i % 2 === 0 ? "auto" : 0,
                    animationDelay: `${d}s`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Video hoặc ảnh */}
        {story.video ? (
          <video
            ref={videoRef}
            key={`video-${story.id}`}
            src={`/thinhnguyencode/videos/${story.video}`}
            className="w-full h-full object-contain bg-black"
            autoPlay
            playsInline
            muted={isMuted}
          />
        ) : (
          <img
            src={`/thinhnguyencode/images/${story.image}`}
            alt="story"
            className="w-full h-full object-contain bg-black"
          />
        )}

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400/40 z-20">
          <div
            className="bg-white h-full transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Username */}
        <div className="absolute top-4 left-4 text-white font-semibold text-sm z-20">
          {story.username}
        </div>

        {/* Cột nút bên phải */}
        <div className="absolute top-2 right-2 flex flex-col gap-4 items-center z-20">
          {/* Close */}
          <button
            className="text-white rounded-full p-2 bg-black/30 hover:bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={22} />
          </button>

          {/* Volume */}
          {story.video && (
            <button
              className="text-white rounded-full p-2 bg-black/30 hover:bg-black/50"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted((m) => !m);
              }}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
          )}

          {/* Heart */}
          <button
            className="text-white rounded-full p-2 bg-black/30 hover:bg-black/50 active:scale-90 transition"
            onClick={handleLike}
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-500 fill-red-500" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
