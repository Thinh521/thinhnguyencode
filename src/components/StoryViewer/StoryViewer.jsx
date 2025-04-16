import React, { useEffect, useRef, useState } from "react";

const StoryViewer = ({ storyList, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const story = storyList[currentIndex];

  // ❌ Không cho scroll khi modal mở
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // ⏱ Xử lý tiến trình và chuyển story
  useEffect(() => {
    if (currentIndex >= storyList.length) {
      onClose();
      return;
    }

    setProgress(0);

    // Dọn sạch interval cũ nếu có
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
        video.muted = isMuted;

        const handleLoadedMetadata = () => {
          const durationMs = video.duration * 1000;
          startProgress(durationMs);
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
  }, [currentIndex, isMuted]);

  if (currentIndex >= storyList.length) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
      <div className="relative w-[400px] h-[680px] bg-white rounded-xl overflow-hidden">
        {/* Ảnh hoặc Video */}
        {story.type === "video" || story.video ? (
          <video
            ref={videoRef}
            src={`/thinhnguyencode/images/${story.video}`}
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
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
        <div className="absolute top-2 left-2 text-white font-bold">
          {story.username}
        </div>

        {/* Thanh tiến trình */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300">
          <div
            className="bg-white h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 bg-white text-black rounded-full p-1"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Nút bật/tắt âm thanh */}
        {(story.type === "video" || story.video) && (
          <button
            className="absolute top-2 right-10 bg-white text-black rounded-full p-1"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              // Biểu tượng mute
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              // Biểu tượng unmute
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
