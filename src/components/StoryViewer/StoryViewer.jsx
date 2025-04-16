import React, { useEffect, useRef, useState } from "react";
import { CloseIcon, VolumeCloseIcon, VolumeOpenIcon } from "../Icons/Icons";

const StoryViewer = ({ storyList, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const story = storyList[currentIndex];

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    if (currentIndex >= storyList.length) {
      onClose();
      return;
    }

    setProgress(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

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
        video.muted = true;
        video.load();

        const handleLoadedMetadata = () => {
          const durationMs = video.duration * 1000;
          startProgress(durationMs);
          video.play().catch((err) => {
            console.warn("Không thể tự phát video:", err);
          });
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        return () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
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
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  if (currentIndex >= storyList.length) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
      <div className="relative w-[95vw] max-w-[400px] h-[90vh] bg-white overflow-hidden">
        {/* Video hoặc Ảnh */}
        {story.type === "video" || story.video ? (
          <video
            ref={videoRef}
            src={`/thinhnguyencode/videos/${story.video}`}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            controls={false}
          />
        ) : (
          <img
            src={`/thinhnguyencode/images/${story.image}`}
            alt="story"
            className="w-full h-full object-cover"
          />
        )}

        {/* Tên người dùng */}
        <div className="absolute top-2 left-2 text-white font-semibold">
          {story.username}
        </div>

        {/* Thanh tiến trình */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
          <div
            className="bg-white h-full transition-[width] duration-500 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 text-white rounded-full p-1"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* Nút bật/tắt âm thanh */}
        {(story.type === "video" || story.video) && (
          <button
            className="absolute top-2 right-10 text-white rounded-full p-1"
            onClick={() => setIsMuted((prev) => !prev)}
          >
            {isMuted ? <VolumeCloseIcon /> : <VolumeOpenIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
