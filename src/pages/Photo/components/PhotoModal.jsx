import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PhotoModal = ({ photo, onClose }) => {
  const [current, setCurrent] = useState(0);

  // reset index khi mở ảnh mới
  useEffect(() => {
    setCurrent(0);
  }, [photo?.id]);

  // keyboard navigation
  useEffect(() => {
    if (!photo) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setCurrent((i) => Math.min(i + 1, photo.images.length - 1));
      if (e.key === "ArrowLeft") setCurrent((i) => Math.max(i - 1, 0));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onClose]);

  // lock scroll
  useEffect(() => {
    if (photo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [photo]);

  if (!photo) return null;

  const images = photo.images || [];
  const hasPrev = current > 0;
  const hasNext = current < images.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          key="modal-box"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative px-[1.4rem]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* IMAGE WRAPPER */}
          <div className="relative inline-block rounded-xl overflow-hidden ">
            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`${photo.title} ${current + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block max-h-[80vh] w-auto"
              />
            </AnimatePresence>

            {/* Overlay container bám đúng theo ảnh */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:bg-black/70 hover:text-white transition-all duration-200"
              >
                <X size={16} />
              </button>

              {/* Left arrow */}
              {hasPrev && (
                <button
                  onClick={() => setCurrent((i) => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 transition"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Right arrow */}
              {hasNext && (
                <button
                  onClick={() => setCurrent((i) => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 transition"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <p className="text-base font-semibold text-white leading-tight">
                  {photo.title}
                </p>

                {photo.category?.length > 0 && (
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    {photo.category.map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-[0.54rem] tracking-[0.1em] uppercase text-white/60"
                      >
                        #{cat}
                      </span>
                    ))}
                  </div>
                )}

                {images.length > 0 && (
                  <p className="mt-2 text-[0.65rem] text-white/40 font-mono tracking-widest">
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoModal;
