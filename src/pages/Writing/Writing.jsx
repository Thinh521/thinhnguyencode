import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen, ArrowRight, Search, X, Feather } from "lucide-react";
import StorytData from "../../data/StoryData";
import PageHeader from "../../components/layout/PageHeader";
import SectionLabel from "../../components/SectionLabel";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .writing-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* section rule */
    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }

    /* search ring */
    .search-ring:focus-within {
      outline: 2px solid #f97316;
      outline-offset: 0px;
    }

    /* card */
    .story-card {
      overflow: hidden;
      transition: border-color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
      display: flex; flex-direction: column; height: 100%;
    }
    .story-card:hover {
      border-color: rgba(249,115,22,0.3);
      transform: translateY(-6px);
    }

    /* image zoom */
    .img-zoom { overflow: hidden; }
    .img-zoom img {
      width: 100%; height: 100%; object-fit: cover; display: block;
      transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease;
    }
    .story-card:hover .img-zoom img {
      transform: scale(1.07);
      filter: brightness(0.95) saturate(1.05);
    }

    /* read more arrow */
    .read-arrow { transition: transform 0.25s ease; }
    .story-card:hover .read-arrow { transform: translateX(5px); }
  `}</style>
);

/* ─────────────────────────────────────────────
   FEATURED CARD (first item, full-width)
───────────────────────────────────────────── */
function FeaturedCard({ item }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <Link to={`/writing/${item.id}`} className="block">
        <div className="story-card relative rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 shadow-md hover:shadow-lg overflow-hidden">
          {/* Featured badge */}
          <div
            className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full"
            style={{
              background: "rgba(249,115,22,0.9)",
              backdropFilter: "blur(8px)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            <Feather size={9} /> Nổi bật
          </div>

          <div className="grid md:grid-cols-[1fr_1fr] min-h-[320px]">
            {/* Image */}
            <div className="img-zoom relative min-h-[220px] md:min-h-0">
              <img src={item.imgae} alt={item.title} loading="eager" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between p-7 md:p-9">
              <div>
                {/* Date + index */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="font-mono-code text-orange-400 text-[0.58rem] tracking-widest uppercase border border-orange-400/25 px-2 py-0.5 rounded">
                    {item.date}
                  </span>
                  {item.category && (
                    <span
                      className="font-mono-code text-[0.56rem] tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>

                <h2
                  className="font-serif-display text-black dark:text-white leading-tight mb-2"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                >
                  {item.title}
                </h2>

                {item.title_2 && (
                  <p className="font-serif-display italic text-neutral-400 text-base mb-3 leading-snug line-clamp-1">
                    {item.title_2}
                  </p>
                )}

                <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-5">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-neutral-700/80">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(249,115,22,0.15)",
                      border: "1px solid rgba(249,115,22,0.25)",
                    }}
                  >
                    <User size={11} className="text-orange-400" />
                  </div>
                  <span className="text-black dark:text-white text-xs font-medium">
                    {item.author}
                  </span>
                </div>

                <span className="text-orange-400 font-mono-code text-[0.65rem] tracking-wider uppercase flex items-center gap-1.5">
                  Đọc ngay
                  <ArrowRight size={12} className="read-arrow" />
                </span>
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
function StoryCard({ item, index }) {
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
      style={{ height: "100%" }}
    >
      <Link to={`/writing/${item.id}`} className="block h-full">
        <div className="story-card relative rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 shadow-md hover:shadow-lg overflow-hidden">
          {/* Image */}
          <div className="img-zoom relative" style={{ height: "200px" }}>
            <img src={item.imgae} alt={item.title} loading="lazy" />

            {/* Date badge */}
            <div
              className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {item.date}
            </div>

            {/* Index watermark */}
            <span
              className="absolute bottom-2 left-3 select-none pointer-events-none z-10"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "3.5rem",
                lineHeight: 1,
                color: "rgba(255,255,255,0.06)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3 relative z-10">
            {item.category && (
              <span
                className="font-mono-code text-[0.56rem] tracking-widest uppercase"
                style={{ color: "rgba(249,115,22,0.6)" }}
              >
                {item.category}
              </span>
            )}

            <h3
              className="text-black dark:text-white font-semibold leading-snug line-clamp-2 transition-colors duration-300"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.35,
              }}
            >
              {item.title}
            </h3>

            {item.title_2 && (
              <p
                className="line-clamp-1 leading-snug text-neutral-400 "
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  marginTop: "-6px",
                }}
              >
                {item.title_2}
              </p>
            )}

            <p className="text-xs leading-relaxed line-clamp-2 flex-1 text-justify text-neutral-500 ">
              {item.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 mt-auto border-t border-neutral-200/80 dark:border-neutral-700/80">
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    border: "1px solid rgba(249,115,22,0.22)",
                  }}
                >
                  <User size={10} className="text-orange-400" />
                </div>
                <span className="text-xs font-medium text-black dark:text-white ">
                  {item.author}
                </span>
              </div>

              <span
                className="font-mono-code text-[0.6rem] tracking-wider uppercase flex items-center gap-1"
                style={{ color: "#f97316" }}
              >
                Đọc
                <ArrowRight size={11} className="read-arrow" />
              </span>
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
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-2 flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="text-5xl mb-4 select-none">📖</div>
      <p
        className="font-mono-code text-[0.7rem] tracking-widest uppercase mb-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        Không tìm thấy bài viết
      </p>
      <button
        onClick={onReset}
        className="font-mono-code text-[0.6rem] text-orange-400 hover:text-orange-300 transition mt-3 flex items-center gap-1 tracking-wider uppercase"
      >
        <X size={10} /> Xoá bộ lọc
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
const Writing = () => {
  const [search, setSearch] = useState("");
  const [featured, ...rest] = StorytData;

  const filtered = useMemo(() => {
    if (!search.trim()) return rest;
    const q = search.toLowerCase();
    return rest.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q),
    );
  }, [search, rest]);

  return (
    <article className="writing-root min-h-screen pb-16">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <PageHeader
          title="Câu chuyện."
          subtitle="Những câu chuyện mà mình đã trải qua trong cuộc sống"
          rightContent={
            <span className="font-serif-display text-[2.5rem] hidden sm:block">
              {String(StorytData.length).padStart(2, "0")}
            </span>
          }
        />
      </motion.div>

      <div>
        {/* ── FEATURED ── */}
        {featured && <FeaturedCard item={featured} />}

        {/* ── SECTION LABEL + SEARCH ── */}
        <SectionLabel icon={BookOpen} count={filtered.length}>
          Tất cả bài viết
        </SectionLabel>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          {/* Search */}
          <div className="search-ring relative flex items-center gap-3 px-4 py-2.5 shrink-0 sm:w-64 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl">
            <Search size={14} className="text-neutral-500 shrink-0" />
            <input
              type="text"
              placeholder="Tìm bài viết..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-white text-sm"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.76rem",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="hover:text-white transition"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── GRID ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <EmptyState key="empty" onReset={() => setSearch("")} />
            ) : (
              filtered.map((item, index) => (
                <StoryCard key={item.id} item={item} index={index} />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </article>
  );
};

export default Writing;
