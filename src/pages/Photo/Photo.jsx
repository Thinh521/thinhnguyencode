import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Camera,
  Utensils,
  Briefcase,
  ImageIcon,
  Smile,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import PhotoData from "../../data/PhotoData";
import storiesData from "../../data/StoriesData";
import { removeVietnameseTones } from "../../utils/stringUtils";
import useViewedStories from "../../hooks/useViewedStories";

import StoryAvatar from "./components/StoryAvatar";
import PhotoThumbnail from "./components/PhotoThumbnail ";
import StoryViewer from "./components/StoryViewer";
import PhotoModal from "./components/PhotoModal";
import PageHeader from "../../components/layout/PageHeader";
import SectionLabel from "../../components/SectionLabel";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Search ring */
    .search-ring:focus-within {
      outline: 2px solid #f97316;
      outline-offset: 0px;
    }

    /* Category pill */
    .cat-pill {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 14px;
      border-radius: 99px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase;
      cursor: pointer; white-space: nowrap;
      transition: all 0.2s ease;
    }
    .cat-pill:hover {
      border-color: rgba(255,255,255,0.2);
    }
    .cat-pill.active {
      background: rgba(249,115,22,0.12);
      border-color: rgba(249,115,22,0.45);
      color: #f97316;
    }

    /* Story strip scrollbar hide */
    .story-strip::-webkit-scrollbar { display: none; }
    .story-strip { -ms-overflow-style: none; scrollbar-width: none; }

    /* section rule */
    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }

    /* Masonry hint on Safari */
    @supports (grid-template-rows: masonry) {
      .masonry-grid {
        grid-template-rows: masonry;
      }
    }

    /* Scroll thin */
    .photo-root ::-webkit-scrollbar { width: 3px; }
    .photo-root ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }
  `}</style>
);

/* ─────────────────────────────────────────────
   EMPTY STATE
───────────────────────────────────────────── */
function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-3 flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="text-5xl mb-4 select-none">📷</div>
      <p
        className="font-mono-code text-[0.7rem] tracking-widest uppercase mb-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        Không tìm thấy ảnh nào
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
   CATEGORY ICONS MAP
───────────────────────────────────────────── */
const ICONS = {
  "Tất cả": Sparkles,
  "Đời thường": Smile,
  "Chân dung": Camera,
  "Du lịch": MapPin,
  "Sáng tạo": ImageIcon,
  "Ẩm thực": Utensils,
  "Công việc": Briefcase,
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Photo() {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { markAsViewed, isViewed } = useViewedStories();

  const handleStoryClick = useCallback(
    (index) => {
      markAsViewed(storiesData[index].id);
      setStartIndex(index);
      setOpen(true);
    },
    [markAsViewed],
  );

  const categories = useMemo(() => {
    const unique = new Set(["Tất cả"]);
    for (const p of PhotoData) for (const c of p.category) unique.add(c);
    return Array.from(unique);
  }, []);

  const filteredPhotos = useMemo(() => {
    const q = removeVietnameseTones(search.toLowerCase());
    return PhotoData.filter((p) => {
      const inCat =
        selectedCat === "Tất cả" || p.category.includes(selectedCat);
      const inSearch =
        !q || removeVietnameseTones(p.title.toLowerCase()).includes(q);
      return inCat && inSearch;
    });
  }, [search, selectedCat]);

  const totalImages = useMemo(
    () => filteredPhotos.reduce((sum, p) => sum + p.images.length, 0),
    [filteredPhotos],
  );

  const reset = () => {
    setSearch("");
    setSelectedCat("Tất cả");
  };

  return (
    <article className="min-h-screen pb-16">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <PageHeader
          title="Ảnh & tin."
          subtitle="Những bức ảnh mình chụp qua ống kính nhiệm màu"
          rightContent={
            <span className="font-playfair text-5xl hidden sm:block">
              {String(PhotoData.length).padStart(2, "0")}
            </span>
          }
        />
      </motion.div>

      <div className="space-y-12">
        {/* ── STORIES ── */}
        <section>
          <SectionLabel icon={Camera} count={storiesData.length}>
            Tin nổi bật
          </SectionLabel>

          <div className="story-strip overflow-x-auto pb-2">
            <div className="flex gap-4 min-w-max px-1">
              {storiesData.map((story, index) => (
                <StoryAvatar
                  key={story.id}
                  story={story}
                  index={index}
                  viewed={isViewed(story.id)}
                  onClick={handleStoryClick}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section>
          <SectionLabel icon={ImageIcon}>Ống kính nhiệm màu</SectionLabel>

          {/* Search + Filter Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            {/* Search */}
            <div
              className="search-ring relative flex items-center gap-3 px-4 py-2.5 rounded-xl flex-1 sm:max-w-xs bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50"
              style={{
                transition: "outline 0.2s",
              }}
            >
              <Search size={14} className="text-neutral-500 shrink-0" />
              <input
                type="text"
                placeholder="Tìm ảnh..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent flex-1 text-sm outline-none font-mono-code"
                style={{
                  color: "white",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  className="hover:text-white transition"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto story-strip flex-1">
              {categories.map((cat) => {
                const Icon = ICONS[cat] || Sparkles;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`cat-pill bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl ${selectedCat === cat ? "active" : ""}`}
                  >
                    <Icon size={11} />
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs text-neutral-900 dark:text-white tracking-widest uppercase">
              {filteredPhotos.length} bộ sưu tập
              {search && (
                <span className="text-orange-400 ml-2">· "{search}"</span>
              )}
            </p>
            <div className="flex items-center gap-1.5">
              <ImageIcon
                size={14}
                className="text-neutral-900 dark:text-white"
              />
              <span className="text-xs text-neutral-900 dark:text-white">
                {totalImages} ảnh
              </span>
            </div>
          </div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            {filteredPhotos.length === 0 ? (
              <EmptyState key="empty" onReset={reset} />
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="columns-2 md:columns-3 gap-3"
              >
                {filteredPhotos.map((photo, idx) => (
                  <PhotoThumbnail
                    key={photo.id}
                    photo={photo}
                    idx={idx}
                    onOpen={setSelectedPhoto}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* ── MODALS ── */}
      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {open && (
        <StoryViewer
          storyList={storiesData}
          onClose={() => setOpen(false)}
          initialIndex={startIndex}
          key={startIndex}
        />
      )}
    </article>
  );
}
