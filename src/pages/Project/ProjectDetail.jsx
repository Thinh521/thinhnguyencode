import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { timelineData } from "../../data/timelineData";
import { skillIcons } from "../../data/skillIcons";

/* ─────────────────────────────────────────────
   FONTS (same system as Projects page)
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .detail-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Skill badge */
    .skill-badge {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 9999px;
      border: 1px solid #f97316;
      color: #f97316;
      background: rgba(249,115,22,0.1);
      transition: border-color 0.2s, background 0.2s;
    }

    /* Responsibility item */
    .resp-item {
      position: relative;
      padding: 18px 20px 18px 52px;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      background: rgba(255,255,255,0.02);
      transition: border-color 0.25s, background 0.25s;
    }
    .resp-item:hover {
      border-color: rgba(249,115,22,0.2);
      background: rgba(249,115,22,0.03);
    }

    /* Link button */
    .proj-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 22px; border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
      border: 1px solid #f97316;
      color: #f97316;
      background: rgba(249,115,22,0.1);
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .proj-btn:hover {
      border-color: rgba(249,115,22,0.5);
      background: rgba(249,115,22,0.1);
    }
    .proj-btn--primary {
      color: #fff;
      background: #f97316;
      border-color: #f97316;
    }
    .proj-btn--primary:hover {
      border-color: rgba(249,115,22,0.28)
      background: rgba(249,115,22,0.28);
      box-shadow: 0 0 20px rgba(249,115,22,0.25);
    }

    /* Back button */
    .back-btn {
      display: inline-flex; align-items: center; gap-7px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;
      transition: color 0.2s;
    }
    .back-btn:hover { color: #f97316; }
    .back-btn svg { transition: transform 0.2s ease; }
    .back-btn:hover svg { transform: translateX(-3px); }

    /* Carousel */
    .carousel-thumb {
      cursor: pointer; border-radius: 6px; overflow: hidden;
      border: 2px solid transparent; transition: border-color 0.2s, opacity 0.2s;
      opacity: 0.5;
    }
    .carousel-thumb.active {
      border-color: #f97316; opacity: 1;
    }
    .carousel-thumb:hover { opacity: 0.8; }

    /* carousel nav button */
    .carousel-nav {
      position: absolute; top: 50%; transform: translateY(-50%);
      z-index: 10; width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(10,10,10,0.7); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 50%;
      color: white; cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .carousel-nav-none {
width: 36px; height: 36px;
display: flex; align-items: center; justify-content: center;
      background: rgba(10,10,10,0.7); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.12); border-radius: 50%;
      color: white; cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }

    .carousel-nav:hover {
      background: rgba(249,115,22,0.3);
      border-color: rgba(249,115,22,0.5);
    }

    /* Sticky header */
    .sticky-bar {
      backdrop-filter: blur(16px) saturate(1.5);
      -webkit-backdrop-filter: blur(16px) saturate(1.5);
    }

    /* Related card */
    .related-card {
      border-radius: 12px; overflow: hidden;
      transition: border-color 0.3s, transform 0.3s;
      text-decoration: none;
    }
    .related-card:hover {
      border-color: rgba(249,115,22,0.3);
      transform: translateY(-4px);
    }

    /* grain overlay */
    .grain-overlay::after {
      content: '';
      position: absolute; inset: 0; z-index: 0; pointer-events: none; border-radius: inherit;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      background-size: 150px;
    }

    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   IMAGE CAROUSEL
───────────────────────────────────────────── */
function ImageCarousel({ images, title }) {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative grain-overlay rounded-xl overflow-hidden bg-neutral-900 aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} - ${current + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />

        {/* Counter */}
        <div className="absolute bottom-3 right-4 font-mono-code text-white/50 text-[0.6rem] tracking-widest">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>

        {/* Nav buttons */}
        {images.length > 1 && (
          <>
            <button
              className="carousel-nav left-3"
              onClick={prev}
              aria-label="Prev"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="carousel-nav right-3"
              onClick={next}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`carousel-thumb shrink-0 w-16 h-11 ${idx === current ? "active" : ""}`}
            >
              <img
                src={img}
                alt={`thumb-${idx}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeading({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <Icon size={13} className="text-orange-400" />
      </div>
      <h2 className="font-mono-code text-[0.65rem] tracking-[0.18em] uppercase text-black dark:text-white">
        {children}
      </h2>
      <div className="flex-1 section-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   RELATED PROJECTS
───────────────────────────────────────────── */
function RelatedProjects({ currentId }) {
  const related = timelineData.filter((p) => p.id !== currentId).slice(0, 3);
  if (!related.length) return null;

  return (
    <section>
      <SectionHeading icon={Layers}>Dự án khác</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
          >
            <Link
              to={`/projects/${p.id}`}
              className="related-card flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 border border-gray-200 dark:border-neutral-700/50 overflow-hidden"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-3">
                <span className="font-mono-code text-orange-400/70 text-[0.55rem] tracking-widest uppercase">
                  {p.type}
                </span>
                <p className="text-black dark:text-white text-xs font-semibold mt-1 line-clamp-2 leading-snug">
                  {p.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NOT FOUND
───────────────────────────────────────────── */
function NotFound() {
  return (
    <div className="detail-root min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-center gap-4 px-6">
      <FontLoader />
      <span className="font-serif-display text-8xl text-white/5">404</span>
      <p className="font-mono-code text-orange-400 text-xs tracking-widest uppercase">
        Không tìm thấy dự án
      </p>
      <Link to="/projects" className="proj-btn proj-btn--primary mt-2">
        <ArrowLeft size={13} /> Quay lại
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = timelineData.find((p) => p.id === id);

  if (!project) return <NotFound />;

  const Icon = project.icon;
  const currentIndex = timelineData.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? timelineData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < timelineData.length - 1
      ? timelineData[currentIndex + 1]
      : null;

  const githubLink = project.links?.find((l) => l.label === "Xem Github");
  const demoLink = project.links?.find((l) => l.label === "Xem Dự án");

  return (
    <article className="detail-root min-h-screen">
      <FontLoader />

      {/* ── STICKY TOP BAR ── */}
      <div className="sticky-bar flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/projects")}
          className="back-btn flex items-center gap-2 text-black dark:text-white"
        >
          <ArrowLeft size={13} />
          <span>Dự án</span>
        </button>

        <span className="font-serif-display text-sm text-black dark:text-white line-clamp-1 max-w-xs hidden sm:block">
          {project.title}
        </span>

        {/* Prev / Next nav */}
        <div className="flex items-center gap-2">
          {prevProject && (
            <Link
              to={`/projects/${prevProject.id}`}
              title={prevProject.title}
              className="carousel-nav-none static transform-none w-8 h-8"
            >
              <ChevronLeft size={14} />
            </Link>
          )}
          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              title={nextProject.title}
              className="carousel-nav-none static transform-none w-8 h-8"
            >
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-4xl mx-auto pb-20 space-y-12">
        {/* ── CAROUSEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ImageCarousel images={project.images} title={project.title} />
        </motion.div>

        {/* ── HERO SECTION ── */}
        <div className="relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto pb-10">
            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5 flex-wrap"
            >
              <span className="font-mono-code text-orange-400 text-[0.6rem] tracking-widest uppercase border border-orange-400/30 px-2.5 py-1 rounded-md">
                {project.type}
              </span>
              <span className="text-neutral-500 text-[0.62rem] font-mono-code flex items-center gap-1.5">
                <Clock size={10} />
                {project.duration}
              </span>
              <span className="font-mono-code text-[0.6rem] tracking-widest text-neutral-600 uppercase">
                #{String(id).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif-display text-4xl md:text-5xl lg:text-[3.5rem] text-black dark:text-white leading-tight mb-4 max-w-2xl"
            >
              {project.title}
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="text-sm leading-relaxed max-w-lg"
            >
              {project.role}
            </motion.p>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-7"
            >
              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-btn"
                >
                  <Github size={13} />
                  Xem Github
                </a>
              )}
              {demoLink && demoLink.url !== githubLink?.url && (
                <a
                  href={demoLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-btn proj-btn--primary"
                >
                  <ExternalLink size={13} />
                  Xem Dự án
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── RESPONSIBILITIES ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55 }}
        >
          <SectionHeading icon={CheckCircle2}>Mô tả dự án</SectionHeading>
          <ul className="space-y-3">
            {project.responsibilities?.map((task, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.04, duration: 0.4 }}
                className="resp-item"
              >
                {/* Index number */}
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-mono-code text-orange-500/40 text-[0.7rem] font-medium leading-none"
                  style={{ top: "20px", transform: "none" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className=" text-sm leading-relaxed text-justify">{task}</p>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* ── SKILLS ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.55 }}
        >
          <SectionHeading icon={Code2}>Kỹ năng sử dụng</SectionHeading>
          <div className="flex flex-wrap gap-2.5">
            {project.skills?.map((skill, idx) => {
              const SkillIcon = skillIcons?.[skill] || Code2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.04, duration: 0.3 }}
                  className="skill-badge"
                >
                  <SkillIcon size={14} className="text-orange-400" />
                  <span className="font-mono-code text-[0.68rem] tracking-wide">
                    {skill}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="section-rule" />

        {/* ── PREV / NEXT PROJECT ── */}
        <div className="grid grid-cols-2 gap-4">
          {prevProject ? (
            <Link to={`/projects/${prevProject.id}`} className="group block">
              <p className="font-mono-code text-[0.58rem] tracking-widest uppercase text-neutral-600 mb-2 flex items-center gap-1">
                <ChevronLeft size={10} /> Dự án trước
              </p>
              <div className="p-4 rounded-xl border border-white/6 bg-white/2 group-hover:border-orange-500/30 transition-colors">
                <p className="font-mono-code text-orange-400/60 text-[0.55rem] uppercase mb-1">
                  {prevProject.type}
                </p>
                <p className="text-white text-sm font-semibold line-clamp-2 leading-snug group-hover:text-orange-300 transition-colors">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group block text-right"
            >
              <p className="font-mono-code text-[0.58rem] tracking-widest uppercase text-neutral-600 mb-2 flex items-center justify-end gap-1">
                Dự án tiếp <ChevronRight size={10} />
              </p>
              <div className="p-4 rounded-xl border border-white/6 bg-white/2 group-hover:border-orange-500/30 transition-colors">
                <p className="font-mono-code text-orange-400/60 text-[0.55rem] uppercase mb-1">
                  {nextProject.type}
                </p>
                <p className="text-black dark:text-white text-sm font-semibold line-clamp-2 leading-snug group-hover:text-orange-300 transition-colors">
                  {nextProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ── RELATED PROJECTS ── */}
        <RelatedProjects currentId={id} />

        {/* ── BACK ── */}
        <div className="pt-2">
          <button
            onClick={() => navigate("/projects")}
            className="back-btn flex items-center gap-2  hover:text-orange-400 transition-colors font-mono-code text-[0.65rem] tracking-widest uppercase"
          >
            <ArrowLeft size={13} />
            Quay lại
          </button>
        </div>
      </div>
    </article>
  );
}
