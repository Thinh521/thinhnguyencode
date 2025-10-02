import { useEffect, useRef, useState } from "react";
import { X, Volume2, VolumeX, Heart } from "lucide-react";

const STORAGE_KEY = "storyLikes";

// Helper: đọc/ghi localStorage
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

const StoryViewer = ({ storyList, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const story = storyList[currentIndex];

  // Khóa scroll background
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Load trạng thái like từ localStorage
  useEffect(() => {
    if (!story) return;
    const store = readStore();
    if (!store[story.id]) {
      store[story.id] = {
        liked: false,
        count: Math.floor(Math.random() * 200) + 5,
      };
      writeStore(store);
    }
    setLiked(store[story.id].liked);
  }, [currentIndex, story]);

  // Swipe xử lý next/prev/close
  const handleTouchStart = (e) => {
    const touch = e.changedTouches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    touchEndX.current = touch.clientX;
    touchEndY.current = touch.clientY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distX = touchStartX.current - touchEndX.current;
    const distY = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (Math.abs(distY) > Math.abs(distX)) {
      if (distY < -threshold) {
        onClose();
      }
    } else {
      if (distX > threshold) {
        setCurrentIndex((prev) => Math.min(prev + 1, storyList.length - 1));
      } else if (distX < -threshold) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // Quản lý tiến trình story
  useEffect(() => {
    if (currentIndex >= storyList.length) {
      onClose();
      return;
    }

    setProgress(0);
    setIsLoading(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const duration = story.type === "video" || story.video ? null : 10000;

    const startProgress = (time) => {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            return 0;
          }
          return prev + 2;
        });
      }, time / 50);
    };

    if (story.type === "video" || story.video) {
      const video = videoRef.current;
      if (video) {
        video.muted = isMuted;
        video.load();

        const handleLoadedMetadata = () => {
          setIsLoading(false);
          const durationMs = video.duration * 1000;
          startProgress(durationMs);
          video.play().catch(() => {});
        };

        const handleEnded = () => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("ended", handleEnded);

        return () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          video.removeEventListener("ended", handleEnded);
          clearInterval(intervalRef.current);
        };
      }
    } else {
      startProgress(duration);
    }

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  if (currentIndex >= storyList.length) return null;

  const handleClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    if (x < bounds.width / 2) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, storyList.length - 1));
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!story) return;
    const store = readStore();

    const entry = store[story.id] || { liked: false, count: 0 };
    if (entry.liked) {
      entry.liked = false;
      entry.count = Math.max(0, entry.count - 1);
    } else {
      entry.liked = true;
      entry.count += 1;
    }

    store[story.id] = entry;
    writeStore(store);

    setLiked(entry.liked);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
      <div
        className="relative w-[95vw] max-w-[400px] h-[90vh] bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-12 h-12 relative transform rotate-45">
              <div
                className="absolute bg-white w-5 h-5 animate-ping"
                style={{ top: 0, left: 0, animationDuration: "1.2s" }}
              />
              <div
                className="absolute bg-white w-5 h-5 animate-ping"
                style={{
                  top: 0,
                  right: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.15s",
                }}
              />
              <div
                className="absolute bg-white w-5 h-5 animate-ping"
                style={{
                  bottom: 0,
                  right: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.3s",
                }}
              />
              <div
                className="absolute bg-white w-5 h-5 animate-ping"
                style={{
                  bottom: 0,
                  left: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.45s",
                }}
              />
            </div>
          </div>
        )}

        {/* Video hoặc ảnh */}
        {story.type === "video" || story.video ? (
          <video
            ref={videoRef}
            key={`video-${currentIndex}`}
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400/50 z-20">
          <div
            className="bg-white h-full transition-[width] duration-500 ease-linear"
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
          {(story.type === "video" || story.video) && (
            <button
              className="text-white rounded-full p-2 bg-black/30 hover:bg-black/50"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted((prev) => !prev);
              }}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
          )}

          {/* Heart */}
          <div className="flex flex-col items-center">
            <button
              className="text-white rounded-full p-2 bg-black/30 hover:bg-black/50 active:scale-90 transition"
              onClick={handleLike}
            >
              <Heart
                className={`w-5 h-5 ${
                  liked ? "text-red-500 fill-red-500" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
