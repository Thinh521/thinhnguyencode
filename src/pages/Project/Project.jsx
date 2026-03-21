import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ExternalLink,
  Github,
  ArrowRight,
  Star,
} from "lucide-react";
import { timelineData } from "../../data/timelineData";

/* ─────────────────────────────────────────────
   FONT INJECTION
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .proj-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    .skill-chip {
      display: inline-flex; align-items: center;
      padding: 2px 10px; border-radius: 9999px;
      border: 1px solid rgba(249,115,22,0.3);
      background: rgba(249,115,22,0.06);
      color: #f97316;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.63rem; letter-spacing: 0.05em; white-space: nowrap;
    }

    .proj-card-hover {
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
    }
    .proj-card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 48px -12px rgba(0,0,0,0.5);
    }

    .img-zoom { overflow: hidden; }
    .img-zoom img {
      transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.7s ease;
    }
    .proj-card-hover:hover .img-zoom img {
      transform: scale(1.06);
      filter: brightness(0.95) saturate(1.1);
    }

    .search-ring:focus-within {
      outline: 2px solid #f97316; outline-offset: 0px;
    }

    .filter-active {
      background: #f97316 !important;
      color: #fff !important;
      border-color: #f97316 !important;
    }

    .grain-overlay {
      position: relative;
    }
    .grain-overlay::after {
      content: '';
      position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      background-size: 150px;
    }

    .featured-arrow {
      transition: transform 0.3s ease;
    }
    .proj-card-hover:hover .featured-arrow {
      transform: translateX(5px);
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const ALL_TYPES = [
  "Tất cả",
  ...Array.from(new Set(timelineData.map((p) => p.type))),
];
const FEATURED_ID = "1";

/* ─────────────────────────────────────────────
   FEATURED CARD
───────────────────────────────────────────── */
function FeaturedCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12"
    >
      {/* Star badge */}
      <div className="absolute -top-3.5 left-6 z-20 flex items-center gap-1.5 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-mono-code">
        <Star size={10} fill="white" />
        Dự án nổi bật
      </div>

      <Link to={`/projects/${item.id}`} className="block">
        <div className="proj-card-hover grain-overlay rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 border border-gray-200 dark:border-neutral-700/50 overflow-hidden">
          <div className="grid md:grid-cols-[1.15fr_1fr] min-h-[360px]">
            {/* LEFT – Image */}
            <div className="img-zoom relative min-h-[240px] md:min-h-0">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              {/* right fade for desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-900/90 hidden md:block" />
              {/* bottom fade for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-transparent to-transparent md:hidden" />
            </div>

            {/* RIGHT – Content */}
            <div className="relative z-10 flex flex-col justify-between p-7 md:p-9">
              <div>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="font-mono-code text-orange-400 text-[0.6rem] tracking-widest uppercase border border-orange-400/30 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <span className="text-neutral-500 text-[0.6rem] font-mono-code">
                    {item.duration}
                  </span>
                </div>

                <h2 className="font-serif-display text-black dark:text-white text-3xl md:text-[2.1rem] leading-tight mb-3">
                  {item.title}
                </h2>

                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-5">
                  {item.responsibilities?.[0]}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.skills?.slice(0, 5).map((s) => (
                    <span key={s} className="skill-chip">
                      {s}
                    </span>
                  ))}
                  {item.skills?.length > 5 && (
                    <span className="font-mono-code text-neutral-500 text-[0.6rem] self-center">
                      +{item.skills.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/6">
                <span className="text-orange-400 font-semibold text-sm flex items-center gap-2">
                  Xem chi tiết
                  <ArrowRight size={14} className="featured-arrow" />
                </span>
                <div className="flex items-center gap-3">
                  {item.links
                    ?.filter((l) => !l.internal)
                    .map((lnk) => (
                      <a
                        key={lnk.url}
                        href={lnk.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title={lnk.label}
                        className="text-neutral-500 hover:text-white transition-colors"
                      >
                        {lnk.label.toLowerCase().includes("github") ? (
                          <Github size={16} />
                        ) : (
                          <ExternalLink size={16} />
                        )}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   REGULAR CARD
───────────────────────────────────────────── */
function ProjectCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/projects/${item.id}`} className="block h-full">
        <div className="proj-card-hover grain-overlay group relative rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 border border-gray-200 dark:border-neutral-700/50 overflow-hidden flex flex-col h-full">
          {/* Image */}
          <div className="img-zoom relative h-60">
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />

            {Icon && (
              <div className="absolute top-3 right-3 bg-neutral-950/70 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 z-10">
                <Icon size={13} className="text-orange-400" />
              </div>
            )}

            <span className="absolute bottom-2 left-4 font-serif-display text-[3.5rem] text-white/6 leading-none select-none pointer-events-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-orange-400/80 text-[0.58rem] tracking-widest uppercase border border-orange-400/20 px-2 py-0.5 rounded">
                {item.type}
              </span>
              <span className="text-neutral-600 text-[0.58rem] font-mono-code">
                {item.duration}
              </span>
            </div>

            <h3 className="text-black dark:text-white font-semibold text-[0.95rem] leading-snug line-clamp-2 group-hover:text-orange-300 transition-colors duration-300">
              {item.title}
            </h3>

            <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 flex-1">
              {item.role}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.skills?.slice(0, 3).map((s) => (
                <span key={s} className="skill-chip">
                  {s}
                </span>
              ))}
              {item.skills?.length > 3 && (
                <span className="font-mono-code text-neutral-600 text-[0.58rem]">
                  +{item.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/6">
              <span className="text-orange-400 text-xs font-medium flex items-center gap-1.5 group/cta">
                Xem chi tiết
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover/cta:translate-x-1"
                />
              </span>
              <div className="flex items-center gap-2.5">
                {item.links
                  ?.filter((l) => !l.internal)
                  .slice(0, 2)
                  .map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={lnk.label}
                      className="text-neutral-600 hover:text-neutral-300 transition-colors"
                    >
                      {lnk.label.toLowerCase().includes("github") ? (
                        <Github size={13} />
                      ) : (
                        <ExternalLink size={13} />
                      )}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-2 flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-5xl mb-4 select-none">🔍</div>
      <p className="text-neutral-400 text-sm font-mono-code">
        Không tìm thấy dự án nào
      </p>
      <p className="text-neutral-600 text-xs mt-2">
        Thử thay đổi từ khóa hoặc bộ lọc
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Tất cả");

  const featured =
    timelineData.find((p) => p.id === FEATURED_ID) ?? timelineData[0];
  const others = timelineData.filter((p) => p.id !== featured.id);

  const filtered = useMemo(() => {
    return others.filter((p) => {
      const matchType = activeType === "Tất cả" || p.type === activeType;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.skills?.some((s) => s.toLowerCase().includes(q));
      return matchType && matchSearch;
    });
  }, [search, activeType, others]);

  return (
    <article className="proj-root min-h-screen ">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <p className="font-mono-cod text-orange-400 text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-orange-400" />
          Portfolio / Projects
        </p>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-5xl md:text-6xl text-black dark:text-white leading-none mb-2">
              Dự án<span className="text-orange-500">.</span>
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
              Những dự án lập trình cá nhân / pet projects của mình từ Github
            </p>
          </div>
          <div className="shrink-0 text-right hidden sm:block select-none">
            <span className="font-serif-display text-[5rem] leading-none block">
              {String(timelineData.length).padStart(2, "0")}
            </span>
            <p className="font-mono-code text-[0.58rem] tracking-[0.2em] -mt-2">
              PROJECTS
            </p>
          </div>
        </div>

        <div className="mt-6 h-px bg-gradient-to-r from-orange-500 via-orange-400/30 to-transparent" />
      </motion.div>

      {/* ── FEATURED ── */}
      <FeaturedCard item={featured} />

      {/* ── SECTION LABEL ── */}
      <div className="flex items-center gap-4 mb-6">
        <p className="font-mono-code text-neutral-500 text-[0.62rem] tracking-[0.2em] uppercase whitespace-nowrap">
          Tất cả dự án
        </p>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      {/* ── SEARCH + FILTER ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        {/* Search input */}
        <div className="search-ring relative flex items-center flex-1 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl px-4 py-2.5 gap-3 transition-all duration-200">
          <Search size={14} className="text-neutral-500 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, kỹ năng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-white text-sm outline-none placeholder:text-neutral-600 font-mono-code"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`font-mono-code text-[0.6rem] tracking-wider uppercase px-4 py-3 rounded-lg border transition-all duration-200
                ${
                  activeType === type
                    ? "filter-active shadow-md shadow-orange-500/20"
                    : "text-neutral-400 hover:border-black hover:text-black bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 "
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── RESULT STATS ── */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono-code text-neutral-600 text-[0.6rem] tracking-widest uppercase">
          {filtered.length} dự án
          {search && <span className="text-orange-400 ml-2">· "{search}"</span>}
        </p>
        {(search || activeType !== "Tất cả") && (
          <button
            onClick={() => {
              setSearch("");
              setActiveType("Tất cả");
            }}
            className="font-mono-code text-[0.6rem] text-neutral-500 hover:text-orange-400 transition-colors tracking-wider uppercase flex items-center gap-1"
          >
            <X size={10} /> Xoá bộ lọc
          </button>
        )}
      </div>

      {/* ── PROJECT GRID ── */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((item, index) => (
              <ProjectCard key={item.id} item={item} index={index} />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </article>
  );
}
