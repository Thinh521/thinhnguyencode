import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Tag,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
  BookOpen,
  Heart,
  Check,
  Quote,
} from "lucide-react";
import StorytData from "../../data/StoryData";
import SectionLabel from "../../components/SectionLabel";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .wd-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }

    .back-btn {
      display: inline-flex; align-items: center; gap: 7px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.64rem; letter-spacing: 0.12em; text-transform: uppercase;
      background: none; border: none; cursor: pointer;
      transition: color 0.2s;
    }
    .back-btn:hover { color: #f97316; }
    .back-btn svg { transition: transform 0.2s; }
    .back-btn:hover svg { transform: translateX(-3px); }

    .meta-badge {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 5px 13px; border-radius: 99px;
      border: 1px solid rgba(255,255,255,0.09);
      background: rgba(255,255,255,0.03);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6rem; letter-spacing: 0.06em;
      color: rgba(255,255,255,0.5);
    }

    .action-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 34px; height: 34px; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.45);
      cursor: pointer; transition: all 0.2s;
    }
    .action-btn:hover {
      border-color: rgba(249,115,22,0.4);
      background: rgba(249,115,22,0.08);
      color: #f97316;
    }
    .action-btn.liked {
      border-color: rgba(239,68,68,0.4);
      background: rgba(239,68,68,0.08);
      color: #ef4444;
    }

    .read-progress {
      position: fixed; top: 0; left: 0; z-index: 100; height: 2px;
      background: linear-gradient(to right, #f97316, #fbbf24);
      pointer-events: none;
    }

    .prose-body {
      font-size: 1rem; line-height: 1.9;
      color: rgba(255,255,255,0.62);
    }
    .prose-body p { margin-bottom: 1.5em; }
    .prose-body p:first-child::first-letter {
      font-family: 'Instrument Serif', serif;
      font-size: 3.8em; line-height: 0.75;
      float: left; margin-right: 0.08em; margin-top: 0.05em;
      color: #f97316;
    }

    .related-card {
      border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
      overflow: hidden; background: rgba(255,255,255,0.02);
      text-decoration: none; display: block;
      transition: border-color 0.3s, transform 0.3s;
    }
    .related-card:hover {
      border-color: rgba(249,115,22,0.3);
      transform: translateY(-4px);
    }
    .related-card-img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.6s ease, filter 0.5s;
      filter: brightness(0.8) saturate(0.7);
    }
    .related-card:hover .related-card-img {
      transform: scale(1.06);
      filter: brightness(0.92) saturate(1);
    }

    .nav-card {
      border: 1px solid rgba(255,255,255,0.07); border-radius: 12px;
      background: rgba(255,255,255,0.02);
      transition: border-color 0.25s, background 0.25s;
      text-decoration: none; display: block; padding: 16px;
    }
    .nav-card:hover {
      border-color: rgba(249,115,22,0.3);
      background: rgba(249,115,22,0.03);
    }

    .grain::after {
      content: ''; position: absolute; inset: 0; z-index: 0;
      pointer-events: none; border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 150px;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   READ PROGRESS BAR
───────────────────────────────────────────── */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="read-progress" style={{ width: `${pct}%` }} />;
}

function readTime(text = "") {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

/* ─────────────────────────────────────────────
   NOT FOUND
───────────────────────────────────────────── */
function NotFound() {
  return (
    <div className="wd-root min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center gap-4 px-6">
      <FontLoader />
      <span className="font-serif-display text-8xl text-white/5">404</span>
      <p className="font-mono-code text-orange-400 text-xs tracking-widest uppercase">
        Không tìm thấy bài viết
      </p>
      <Link
        to="/writing"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono-code text-[0.68rem] tracking-widest uppercase text-white mt-2"
        style={{
          background: "rgba(249,115,22,0.14)",
          border: "1px solid #f97316",
        }}
      >
        <ArrowLeft size={13} /> Quay lại
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
const WritingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = StorytData.find((item) => item.id === parseInt(id));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    () => Math.floor(Math.random() * 80) + 12,
  );
  const [copied, setCopied] = useState(false);

  const storyIndex = StorytData.findIndex((item) => item.id === parseInt(id));
  const prevStory = storyIndex > 0 ? StorytData[storyIndex - 1] : null;
  const nextStory =
    storyIndex < StorytData.length - 1 ? StorytData[storyIndex + 1] : null;
  const related = StorytData.filter((s) => s.id !== story?.id).slice(0, 3);

  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 400], [0, 70]);

  if (!story) return <NotFound />;

  const minutes = readTime(story.description);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split description into paragraphs
  const paragraphs = story.description
    ? story.description.split(/\n+/).filter(Boolean)
    : [story.description];

  return (
    <article className="wd-root min-h-screen">
      <FontLoader />
      <ReadingProgress />

      {/* ── STICKY BAR ── */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="back-btn flex items-center gap-2 text-black dark:text-white"
          onClick={() => navigate("/writing")}
        >
          <ArrowLeft size={13} /> Câu chuyện
        </button>

        <span className="font-serif-display text-sm text-black dark:text-white line-clamp-1 max-w-xs hidden sm:block">
          {story.title}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className={`action-btn ${copied ? "liked" : ""}`}
            style={
              copied
                ? {
                    borderColor: "rgba(74,222,128,0.4)",
                    color: "#4ade80",
                    background: "rgba(74,222,128,0.08)",
                  }
                : {}
            }
          >
            {copied ? <Check size={13} /> : <Share2 size={13} />}
          </button>
          {prevStory && (
            <Link
              to={`/writing/${prevStory.id}`}
              className="action-btn"
              title={prevStory.title}
            >
              <ChevronLeft size={14} />
            </Link>
          )}
          {nextStory && (
            <Link
              to={`/writing/${nextStory.id}`}
              className="action-btn"
              title={nextStory.title}
            >
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(300px, 52vh, 500px)" }}
      >
        {/* Blurred BG */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${story.imgae})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(48px) brightness(0.16) saturate(0.4)",
            transform: "scale(1.12)",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-neutral-950" />

        {/* Parallax image */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 z-0">
          <img
            src={story.imgae}
            alt={story.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.7)" }}
          />
        </motion.div>

        {/* Gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(10,10,10,0.97) 100%)",
          }}
        />

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-3xl mx-auto px-4 md:px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="meta-badge">
                <Calendar size={10} className="text-orange-400" />
                {story.date}
              </span>
              <span className="meta-badge">
                <Clock size={10} className="text-orange-400" />
                {minutes} phút đọc
              </span>
              {story.title_2 && (
                <span className="meta-badge">
                  <Tag size={10} className="text-orange-400" />
                  {story.title_2}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-white leading-tight mb-3"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
              }}
            >
              {story.title}
            </h1>

            {/* Author + actions */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(249,115,22,0.15)",
                    border: "1px solid rgba(249,115,22,0.3)",
                  }}
                >
                  <User size={12} className="text-orange-400" />
                </div>
                <span className="text-white text-xs font-medium">
                  {story.author}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleLike}
                  whileTap={{ scale: 0.85 }}
                  className={`action-btn ${liked ? "liked" : ""}`}
                >
                  <Heart
                    size={13}
                    style={{ fill: liked ? "#ef4444" : "transparent" }}
                  />
                </motion.button>
                <span className="font-mono-code text-[0.58rem] text-neutral-500">
                  {likeCount}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-20">
        {/* Drop-cap pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative my-10 px-6 py-5 grain"
          style={{
            borderLeft: "2px solid #f97316",
            background: "rgba(249,115,22,0.04)",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <Quote
            size={18}
            className="text-orange-400 mb-2"
            style={{ opacity: 0.55 }}
          />
          <p
            className="relative z-10 text-black dark:text-white"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              lineHeight: 1.8,
            }}
          >
            {paragraphs[0]?.split(".").slice(0, 2).join(".") + "."}
          </p>
        </motion.div>

        {/* Prose */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6 }}
          className="prose-body"
        >
          {paragraphs.map((para, i) => (
            <p key={i} className="text-neutral-500 dark:text-neutral-400">
              {para}
            </p>
          ))}
        </motion.div>

        {/* Tag pills */}
        {story.title_2 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {story.title_2.split(/[,，]/).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(249,115,22,0.7)",
                  background: "rgba(249,115,22,0.07)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  borderRadius: "99px",
                  padding: "4px 12px",
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* ── LIKE + SHARE CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mt-10 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              onClick={handleLike}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{
                border: liked
                  ? "1px solid rgba(239,68,68,0.35)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: liked
                  ? "rgba(239,68,68,0.08)"
                  : "rgba(255,255,255,0.03)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.1em",
                color: liked ? "#ef4444" : "rgba(255,255,255,0.4)",
              }}
            >
              <Heart
                size={12}
                style={{ fill: liked ? "#ef4444" : "transparent" }}
              />
              {liked ? "Đã thích" : "Yêu thích"} · {likeCount}
            </motion.button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.64rem",
                letterSpacing: "0.1em",
                color: copied
                  ? "rgba(74,222,128,0.8)"
                  : "rgba(255,255,255,0.4)",
              }}
            >
              {copied ? <Check size={12} /> : <Share2 size={12} />}
              {copied ? "Đã sao chép!" : "Chia sẻ"}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: "rgba(255,255,255,0.2)" }} />
            <span
              className="font-mono-code text-[0.57rem]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {minutes} phút đọc
            </span>
          </div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="section-rule my-10" />

        {/* ── PREV / NEXT ── */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {prevStory ? (
            <Link to={`/writing/${prevStory.id}`} className="nav-card">
              <p
                className="font-mono-code text-[0.55rem] tracking-widest uppercase flex items-center gap-1 mb-2"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                <ChevronLeft size={9} /> Bài trước
              </p>
              <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">
                {prevStory.title}
              </p>
              <p
                className="font-mono-code text-[0.55rem] mt-1"
                style={{ color: "rgba(249,115,22,0.5)" }}
              >
                {prevStory.date}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {nextStory ? (
            <Link
              to={`/writing/${nextStory.id}`}
              className="nav-card text-right"
            >
              <p
                className="font-mono-code text-[0.55rem] tracking-widest uppercase flex items-center justify-end gap-1 mb-2"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Bài tiếp <ChevronRight size={9} />
              </p>
              <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">
                {nextStory.title}
              </p>
              <p
                className="font-mono-code text-[0.55rem] mt-1"
                style={{ color: "rgba(249,115,22,0.5)" }}
              >
                {nextStory.date}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ── RELATED ── */}
        {related.length > 0 && (
          <section>
            <SectionLabel icon={BookOpen}>Bài viết khác</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <Link to={`/writing/${s.id}`} className="related-card">
                    <div
                      className="relative overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      <img
                        src={s.imgae}
                        alt={s.title}
                        loading="lazy"
                        className="related-card-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
                    </div>
                    <div className="p-3">
                      <span
                        className="font-mono-code text-[0.52rem] tracking-widest uppercase"
                        style={{ color: "rgba(249,115,22,0.55)" }}
                      >
                        {s.date}
                      </span>
                      <p className="text-white text-xs font-semibold mt-0.5 line-clamp-2 leading-snug">
                        {s.title}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── BACK ── */}
        <div className="pt-10">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={13} /> Quay lại danh sách
          </button>
        </div>
      </div>
    </article>
  );
};

export default WritingDetail;
