import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const PhotoModal = ({ photo, onClose }) => {
  const [current, setCurrent] = useState(0);

  // Reset index when photo changes
  useEffect(() => {
    setCurrent(0);
  }, [photo?.id]);

  // Keyboard navigation
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

  // Lock scroll
  useEffect(() => {
    if (photo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
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
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(5,5,5,0.96)", backdropFilter: "blur(12px)" }}
        onClick={onClose}
      >
        {/* Main container */}
        <motion.div
          key="modal-box"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col"
          style={{
            maxWidth: "min(92vw, 860px)",
            width: "100%",
            maxHeight: "92vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── TOP BAR ── */}
          <div className="flex items-center justify-between px-1 pb-3">
            <div>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(1rem, 3vw, 1.25rem)",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.2,
                }}
              >
                {photo.title}
              </p>
              {images.length > 1 && (
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  {String(current + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(249,115,22,0.15)";
                e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* ── IMAGE ── */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ background: "#0d0d0d" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={images[current]}
                alt={`${photo.title} ${current + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full object-contain"
                style={{ maxHeight: "74vh", display: "block" }}
              />
            </AnimatePresence>

            {/* Nav arrows */}
            {hasPrev && (
              <button
                onClick={() => setCurrent((i) => i - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(249,115,22,0.3)";
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={() => setCurrent((i) => i + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(249,115,22,0.3)";
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.6)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                <ChevronRight size={16} />
              </button>
            )}

            {/* Progress bar */}
            {images.length > 1 && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${((current + 1) / images.length) * 100}%`,
                    background: "linear-gradient(to right, #f97316, #fbbf24)",
                  }}
                />
              </div>
            )}
          </div>

          {/* ── THUMBNAIL STRIP ── */}
          {images.length > 1 && (
            <div
              className="flex gap-2 mt-3 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="shrink-0 overflow-hidden transition-all duration-200"
                  style={{
                    width: "56px",
                    height: "40px",
                    borderRadius: "6px",
                    border:
                      i === current
                        ? "2px solid #f97316"
                        : "2px solid rgba(255,255,255,0.08)",
                    opacity: i === current ? 1 : 0.45,
                    transform: i === current ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* ── TAGS ── */}
          {photo.category?.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {photo.category.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(249,115,22,0.7)",
                    background: "rgba(249,115,22,0.07)",
                    border: "1px solid rgba(249,115,22,0.2)",
                    borderRadius: "99px",
                    padding: "3px 10px",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoModal;
