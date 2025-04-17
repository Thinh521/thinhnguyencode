import React, { useEffect, useRef, useState } from "react";
import { CloseIcon, VolumeCloseIcon, VolumeOpenIcon } from "../Icons/Icons";

const StoryViewer = ({ storyList, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  const story = storyList[currentIndex];

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

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

  useEffect(() => {
    if (currentIndex >= storyList.length) {
      onClose();
      return;
    }

    setProgress(0);
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
          const durationMs = video.duration * 1000;
          startProgress(durationMs);
          video
            .play()
            .catch((err) => console.warn("Không thể tự phát video:", err));
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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
      <div
        className="relative w-[95vw] max-w-[400px] h-[90vh] bg-black overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Video hoặc Hình ảnh */}
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

        {/* Tên người đăng */}
        <div className="absolute top-3 left-3 text-white font-semibold text-sm z-20">
          {story.username}
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400/50 z-20">
          <div
            className="bg-white h-full transition-[width] duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 text-white rounded-full p-1 z-20"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CloseIcon />
        </button>

        {/* Nút âm thanh */}
        {(story.type === "video" || story.video) && (
          <button
            className="absolute top-2 right-12 text-white rounded-full p-1 z-20"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((prev) => !prev);
            }}
          >
            {isMuted ? <VolumeCloseIcon /> : <VolumeOpenIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
