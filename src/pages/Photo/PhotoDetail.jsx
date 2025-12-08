import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

import Header from "../../components/Header/Header";
import PhotoData from "../../data/PhotoData";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";
import BackButton from "../../components/Button/BackButton";

const PhotoDetail = () => {
  const { id } = useParams();
  const photo = PhotoData.find((item) => item.id === parseInt(id));

  const sliderRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === photo.images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? photo.images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleTouch = useRef({
    startX: 0,
    endX: 0,
    startTime: 0,
  });

  const onTouchStart = (e) => {
    handleTouch.current.startX = e.touches[0].clientX;
    handleTouch.current.startTime = Date.now();
  };

  const onTouchMove = (e) => {
    handleTouch.current.endX = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = handleTouch.current.startX - handleTouch.current.endX;
    const timeDiff = Date.now() - handleTouch.current.startTime;
    const velocity = Math.abs(diff) / timeDiff;

    // Swipe phải (previous)
    if (diff < -50 || (diff < -20 && velocity > 0.5)) {
      prevSlide();
    }
    // Swipe trái (next)
    else if (diff > 50 || (diff > 20 && velocity > 0.5)) {
      nextSlide();
    }
  };

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[999] flex flex-col items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 transition-all backdrop-blur-md"
          >
            ✕
          </button>

          <img
            src={photo.images[fullscreenIndex]}
            className="max-w-full max-h-full object-contain"
            alt="Fullscreen view"
          />
        </div>
      )}

      <article>
        <StickyHeader title={photo.title} />

        <Header
          title={photo.title}
          subtitle="Những bức ảnh mà mình tự chụp qua ống kính nhiệm màu"
        />

        <div className="mb-5 text-right">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Bộ sưu tập ảnh
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {photo.images.length} ảnh trong bộ sưu tập này
          </p>
        </div>

        {/* ---------- SLIDER ---------- */}
        <section className="relative w-full overflow-hidden mb-10">
          {/* Wrapper */}
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {photo.images.map((img, index) => (
              <div
                key={index}
                className="min-w-full flex-shrink-0 px-1 sm:px-2"
                style={{ height: "580px" }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg"
                    alt={`${photo.title} - ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    onClick={() => {
                      setFullscreenIndex(index);
                      setIsFullscreen(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Nút trái */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white rounded-full w-9 h-9 items-center justify-center hover:bg-black/70 hover:scale-110 transition-all active:scale-95 disabled:opacity-50 z-10"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Nút phải */}
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white rounded-full w-9 h-9 items-center justify-center hover:bg-black/70 hover:scale-110 transition-all active:scale-95 disabled:opacity-50 z-10"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Counter & Dots Container */}
          <div className="absolute bottom-0 left-0 right-0 pb-6 sm:pb-3">
            <div className="flex justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
                {photo.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full ${
                      current === index
                        ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white"
                        : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <BackButton className="mt-5 mb-10" />
      </article>
    </>
  );
};

export default PhotoDetail;
