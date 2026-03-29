import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";

export default function Featuredwriting({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link to={`/writing/${item.id}`} className="block h-full">
        <div className="relative rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 shadow-md hover:shadow-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-[250px]">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Date */}
            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 text-[0.68rem] tracking-[0.08em] text-white">
              {item.date}
            </div>

            {/* Index watermark */}
            <span className="absolute bottom-2 left-3 select-none pointer-events-none z-10 font-serif text-[3.5rem] leading-none text-white/5">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-2 relative z-10">
            {item.category && (
              <span className="font-mono text-[0.56rem] tracking-widest uppercase text-orange-500/60">
                {item.category}
              </span>
            )}

            <h2 className="font-playfair text-neutral-900 dark:text-white text-xl font-semibold leading-tight">
              {item.title}
            </h2>

            {item.title_2 && (
              <p className="line-clamp-1 leading-snug text-neutral-400 italic text-[0.85rem]">
                {item.title_2}
              </p>
            )}

            <p className="text-xs leading-relaxed line-clamp-2 flex-1 text-justify text-neutral-500 mb-2">
              {item.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-auto border-t border-neutral-200/80 dark:border-neutral-700/80">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-500/10 border border-orange-500/20">
                  <User size={10} className="text-orange-400" />
                </div>
                <span className="text-xs font-medium text-black dark:text-white">
                  {item.author}
                </span>
              </div>

              <span className="text-xs uppercase tracking-wider text-neutral-900 dark:text-white hover:text-primary-400 transition-colors flex items-center gap-1">
                Đọc ngay
                <ArrowRight size={11} className="read-arrow" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
