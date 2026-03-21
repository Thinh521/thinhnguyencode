import { memo } from "react";
import { motion } from "framer-motion";
import { Images } from "lucide-react";

const PhotoThumbnail = memo(({ photo, idx, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: idx * 0.045,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onOpen(photo)}
      className="group relative block w-full cursor-pointer overflow-hidden mb-3 break-inside-avoid"
      style={{ borderRadius: "12px", background: "#111" }}
    >
      {/* Image */}
      <div className="overflow-hidden" style={{ borderRadius: "12px" }}>
        <img
          src={photo.images[0]}
          alt={photo.title}
          loading="lazy"
          className="w-full h-auto object-cover block"
          style={{
            transition:
              "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      {/* Bottom gradient + info */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          borderRadius: "0 0 12px 12px",
          transform: "translateY(4px)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="flex items-end justify-between gap-2">
          <p
            className="text-white text-xs leading-snug line-clamp-2 flex-1"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600 }}
          >
            {photo.title}
          </p>

          {photo.images.length > 1 && (
            <div
              className="flex items-center gap-1 shrink-0"
              style={{
                background: "rgba(249,115,22,0.2)",
                border: "1px solid rgba(249,115,22,0.4)",
                borderRadius: "99px",
                padding: "2px 7px",
              }}
            >
              <Images size={9} className="text-orange-400" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "#fb923c",
                  letterSpacing: "0.06em",
                }}
              >
                {photo.images.length}
              </span>
            </div>
          )}
        </div>

        {/* Category tags */}
        {photo.category?.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {photo.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.52rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Top-right hover arrow */}
      <div
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{
          background: "rgba(249,115,22,0.85)",
          backdropFilter: "blur(6px)",
          transform: "scale(0.8)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 8L8 2M8 2H3M8 2V7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  );
});

PhotoThumbnail.displayName = "PhotoThumbnail";
export default PhotoThumbnail;
