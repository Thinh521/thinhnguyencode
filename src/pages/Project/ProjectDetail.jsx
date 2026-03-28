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
  ArrowRight,
} from "lucide-react";
import { timelineData } from "../../data/timelineData";
import { skillIcons } from "../../data/skillIcons";
import FeaturedProjects from "../../components/Project/FeaturedProjects/FeaturedProjects";
import SectionLabel from "../../components/SectionLabel";
import Button from "../../components/Button/Button";

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

    .section-rule {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(249,115,22,0.3), rgba(249,115,22,0.3), transparent);
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
      <div className="relative overflow-hidden bg-neutral-900 h-[300px] md:h-[600px]">
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
        <div className="absolute bottom-3 right-6 text-white/50 text-[0.6rem] tracking-widest">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>

        {/* Nav buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Prev"
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10
        w-9 h-9 flex items-center justify-center
        rounded-full
        bg-black/60 backdrop-blur
        border border-white/20
        text-white
        cursor-pointer
        transition-all duration-200
        hover:bg-black/80"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10
        w-9 h-9 flex items-center justify-center
        rounded-full
        bg-black/60 backdrop-blur
        border border-white/20  
        text-white
        cursor-pointer
        transition-all duration-200
        hover:bg-black/80"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pt-2 pb-4 lg:px-[14rem] px-[1.4rem]">
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
    <article className="min-h-screen">
      <FontLoader />

      {/* ── CAROUSEL ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <ImageCarousel images={project.images} title={project.title} />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="pb-20 lg:px-[14rem] px-[1.4rem]">
        <div className="relative overflow-hidden">
          <div className="relative z-10 pb-10">
            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5 flex-wrap"
            >
              <span className="text-primary-400 text-xs tracking-widest uppercase border border-primary-400/30 px-2 py-0.5 rounded">
                {project.type}
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Clock size={12} />
                {project.duration}
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 tracking-widest uppercase">
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
              className="font-playfair text-neutral-900 dark:text-white text-2xl font-semibold leading-tight mb-2"
            >
              {project.title}
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed"
            >
              {project.role}
            </motion.p>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-5"
            >
              {githubLink && (
                <Button
                  href={githubLink.url}
                  newTab
                  leftIcon={<Github size={13} />}
                  variant="outline"
                >
                  Xem Github
                </Button>
              )}

              {demoLink && demoLink.url !== githubLink?.url && (
                <Button
                  href={demoLink.url}
                  newTab
                  leftIcon={<ExternalLink size={13} />}
                  variant="primary"
                >
                  Xem Dự án
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── RESPONSIBILITIES ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="mb-6"
        >
          <SectionLabel icon={CheckCircle2}>Mô tả dự án</SectionLabel>
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
          className="mb-6"
        >
          <SectionLabel icon={Code2}>Kỹ năng sử dụng</SectionLabel>
          <div className="flex flex-wrap gap-2.5">
            {project.skills?.map((skill, idx) => {
              const SkillIcon = skillIcons?.[skill] || Code2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.04, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.62rem] tracking-wider shrink-0 cursor-pointer text-neutral-900 dark:text-white border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 hover:border-primary-400/50 hover:bg-primary-400/10 transition-all duration-300"
                >
                  <SkillIcon size={14} className="text-orange-400" />
                  <span className="text-xs text-neutral-900 dark:text-white tracking-wide">
                    {skill}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── DIVIDER ── */}
        <div className="section-rule mb-6" />

        {/* ── PREV / NEXT PROJECT ── */}
        <div className="grid grid-cols-2 gap-4">
          {prevProject ? (
            <Link to={`/projects/${prevProject.id}`} className="group block">
              <div className="p-4 rounded-xl border border-white/6 bg-white/2 group-hover:border-orange-500/30 transition-colors">
                <p className="font-mono-code text-[0.58rem] tracking-widest uppercase text-neutral-600 mb-2 flex items-center gap-1">
                  <ChevronLeft size={10} /> Dự án trước
                </p>
                <p className="text-neutral-900 dark:text-white text-sm font-semibold line-clamp-2 leading-snug group-hover:text-orange-300 transition-colors">
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
              <div className="p-4 rounded-xl border border-white/6 bg-white/2 group-hover:border-orange-500/30 transition-colors">
                <p className="font-mono-code text-[0.58rem] tracking-widest uppercase text-neutral-600 mb-2 flex items-center justify-end gap-1">
                  Dự án tiếp <ChevronRight size={10} />
                </p>
                <p className="text-neutral-900 dark:text-white text-sm font-semibold line-clamp-2 leading-snug group-hover:text-orange-300 transition-colors">
                  {nextProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="s-rule mb-10" />
          <div className="flex items-center justify-between mb-6">
            <SectionLabel icon={Code2} className="!mb-0">
              Dự án nổi bật
            </SectionLabel>
            <Link
              to="/projects"
              className="flex items-center gap-1.5 font-mono text-[0.62rem] tracking-widest uppercase transition-colors text-black dark:text-white hover:text-orange-500"
            >
              Tất cả <ArrowRight size={11} />
            </Link>
          </div>
          <FeaturedProjects projects={timelineData.slice(0, 3)} />
        </motion.section>

        {/* ── BACK ── */}
        <div className="pt-2">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2  hover:text-orange-400 transition-colors font-mono-code text-[0.65rem] tracking-widest uppercase"
          >
            <ArrowLeft size={13} />
            Quay lại
          </button>
        </div>
      </div>
    </article>
  );
}
