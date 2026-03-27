import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
      className="group relative block w-full cursor-pointer overflow-hidden mb-3 break-inside-avoid rounded-xl"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
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
          <p className="text-white text-xs font-semibold leading-snug line-clamp-2 flex-1">
            {photo.title}
          </p>
        </div>
        {photo.category?.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap font-mono text-[0.54rem] tracking-[0.1em] uppercase text-white/60">
            {photo.category.slice(0, 2).map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
        )}
      </div>

      {/* Top-right hover arrow */}
      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-neutral-900/0 backdrop-blur-sm opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100">
        <ArrowUpRight size={12} className="text-white" />
      </div>
    </motion.div>
  );
});

PhotoThumbnail.displayName = "PhotoThumbnail";
export default PhotoThumbnail;
