import { useParams } from "react-router-dom";
import { useRef, useState, useCallback } from "react";

import Header from "../../components/Header/Header";
import PhotoData from "../../data/PhotoData";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";
import BackButton from "../../components/Button/BackButton";

const SWIPE_DISTANCE = 60;
const SWIPE_TIME = 500;

const PhotoDetail = () => {
  const { id } = useParams();
  const photo = PhotoData.find((item) => item.id === Number(id));

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const touch = useRef({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    startTime: 0,
  });

  const total = photo?.images.length ?? 0;

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((p) => (p + 1) % total);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, total]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((p) => (p - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, total]);

  const goTo = (index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = {
      startX: t.clientX,
      startY: t.clientY,
      endX: t.clientX,
      endY: t.clientY,
      startTime: Date.now(),
    };
  };

  const onTouchMove = (e) => {
    const t = e.touches[0];
    touch.current.endX = t.clientX;
    touch.current.endY = t.clientY;

    const dx = touch.current.endX - touch.current.startX;
    const dy = touch.current.endY - touch.current.startY;

    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    const dx = touch.current.endX - touch.current.startX;
    const dy = touch.current.endY - touch.current.startY;
    const dt = Date.now() - touch.current.startTime;

    if (Math.abs(dx) < Math.abs(dy)) return;
    if (Math.abs(dx) < SWIPE_DISTANCE) return;
    if (dt > SWIPE_TIME) return;

    dx > 0 ? goPrev() : goNext();
  };

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            ✕
          </button>
          <img
            src={photo.images[fullscreenIndex]}
            alt="fullscreen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <article>
        <StickyHeader title={photo.title} />

        <Header
          title={photo.title}
          subtitle="Những bức ảnh mà mình tự chụp qua ống kính nhiệm màu"
        />

        <section
          className="relative w-full overflow-hidden mb-10"
          style={{ touchAction: "pan-y" }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {photo.images.map((img, i) => (
              <div
                key={i}
                className="min-w-full h-[580px] px-2 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`${photo.title}-${i}`}
                  className="max-h-full object-contain cursor-zoom-in"
                  loading={i === 0 ? "eager" : "lazy"}
                  onClick={() => {
                    setFullscreenIndex(i);
                    setIsFullscreen(true);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={goPrev}
            disabled={isAnimating}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white items-center justify-center"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            disabled={isAnimating}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white items-center justify-center"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex gap-2 px-3 py-1.5 bg-black/20 rounded-full backdrop-blur">
              {photo.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    current === i ? "w-8 bg-white" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <Divider />
        <BackButton className="mt-6 mb-10" />
      </article>
    </>
  );
};

export default PhotoDetail;
