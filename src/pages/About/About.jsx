import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaWordpress,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaGraduationCap,
} from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import {
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiPostman,
  SiFirebase,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  ExternalLink,
  BookOpen,
  Wrench,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import { IMAGES } from "../../../public/images/imgaes";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .about-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Tab button */
    .tab-btn {
      position: relative;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      cursor: pointer;
      transition: color 0.25s, border-color 0.25s, background 0.25s;
      white-space: nowrap;
    }
    .tab-btn:hover {  border-color: #f97316;  background: rgba(249,115,22,0.1); }
    .tab-btn.active {
      border-color: #f97316;
      background: rgba(249,115,22,0.1);
    }

    .tab-btn:hover svg { color: #f97316; }
    .tab-btn.active svg { color: #f97316; }
    /* Skill chip */
    .skill-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; color: rgba(255,255,255,0.65);
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .skill-item:hover {
      border-color: rgba(249,115,22,0.35);
      background: rgba(249,115,22,0.05);
    }

    /* Info table row */
    .info-row {
      display: flex; justify-content: space-between; align-items: baseline;
      gap: 12px; padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .info-row:last-child { border-bottom: none; }

    /* Timeline dot */
    .tl-dot {
      position: absolute;
      left: -5px; top: 2px;
      width: 10px; height: 10px;
      border-radius: 50%;
      border: 2px solid #f97316;
      background: #0a0a0a;
    }

    /* section rule */
    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
      margin-bottom: 28px;
    }

    /* Image panel */
    .img-panel {
      position: relative; overflow: hidden;
    }
    .img-panel img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                  filter 0.5s ease;
    }

    /* grain */
    .grain::after {
      content: '';
      position: absolute; inset: 0; pointer-events: none; z-index: 1;
      background-image: url("data?:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 150px;
    }

    /* resume btn */
    .resume-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 22px; border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
      background: #f97316;
      border: 1px solid #f97316;
      color: #fff;
      text-decoration: none;
      transition: background 0.25s, box-shadow 0.25s;
    }
    .resume-btn:hover {
      background: rgba(249,115,22,0.28);
      box-shadow: 0 0 24px rgba(249,115,22,0.2);
    }

    /* scroll fade */
    .content-scroll::-webkit-scrollbar { width: 3px; }
    .content-scroll::-webkit-scrollbar-track { background: transparent; }
    .content-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 99px; }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React Native", icon: <FaReact /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <FaNodeJs /> },
      { name: "Firebase", icon: <SiFirebase /> },
    ],
  },
  {
    title: "Blockchain",
    skills: [
      { name: "Smart Contract", icon: "⛓️" },
      { name: "Blockchain", icon: "🔗" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "GitHub", icon: <FaGithub /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "WordPress", icon: <FaWordpress /> },
    ],
  },
  {
    title: "Design & Media",
    skills: [
      { name: "Figma", icon: <FaFigma /> },
      { name: "Photoshop", icon: <SiAdobephotoshop /> },
      { name: "Illustrator", icon: <SiAdobeillustrator /> },
      { name: "Premiere Pro", icon: <SiAdobepremierepro /> },
      { name: "CapCut", icon: "🎬" },
    ],
  },
];

const studyInfo = [
  { label: "Họ và tên", value: "Nguyễn Phúc Thịnh" },
  { label: "Chuyên ngành", value: "Thiết Kế Trang Web" },
  { label: "Loại hình đào tạo", value: "Chính quy" },
  { label: "Bằng cấp", value: "Cử nhân Cao đẳng" },
  { label: "Tình trạng", value: "Đã tốt nghiệp" },
  { label: "GPA", value: "3.35 / 4.0" },
  { label: "Xếp loại", value: "Giỏi" },
  { label: "Thời gian", value: "2022 – 2025" },
];

const experience = [
  {
    year: "06/2025 – 12/2025",
    company: "Pione Group",
    role: "Thực tập sinh Mobile Developer (React Native)",
    desc: "Phát triển ứng dụng di động bằng React Native, triển khai giao diện từ thiết kế Figma, tích hợp RESTful API, làm việc với Firebase và Smart Contract cho các chức năng dữ liệu thời gian thực.",
    current: false,
  },
  {
    year: "2026 – Hiện tại",
    company: "Freelance",
    role: "Web Developer",
    desc: "Xây dựng ứng dụng web như một sở thích cá nhân.",
    current: true,
  },
];

/* ─────────────────────────────────────────────
   CONTENT PANELS
───────────────────────────────────────────── */
const StoryPanel = () => (
  <div className="space-y-6">
    <div>
      <p className="font-mono-code text-orange-400 text-[0.6rem] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
        <span className="w-4 h-px bg-orange-400 inline-block" /> Câu chuyện
      </p>
      <h2 className="font-serif-display text-3xl sm:text-4xl text-black dark:text-white leading-tight mb-4">
        Xin chào, mình là Thịnh<span className="text-orange-500">.</span>
      </h2>
      <p className="text-sm leading-[1.85] text-justify">
        Hiện tại mình đang là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
        tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC). Mình đang dồn hết
        tâm huyết cho các dự án tốt nghiệp — website cá nhân này chính là một
        trong những dự án tâm đắc nhất của mình.
      </p>
    </div>

    <p className="text-sm leading-[1.85] text-justify">
      Mình có niềm yêu thích đặc biệt với lập trình giao diện (Frontend) và
      không ngừng tự học thêm để xây dựng những ứng dụng hiện đại, độc đáo.
      Ngoài ra, mình cực kỳ đam mê quay phim và chụp ảnh — đó là cách mình lưu
      giữ những khoảnh khắc đáng nhớ nhất của bản thân và những người thân yêu.
    </p>

    {/* Quick stats */}
    <div className="grid grid-cols-3 gap-3 pt-2">
      {[
        { num: "7+", label: "Dự án" },
        { num: "3.35", label: "GPA" },
        { num: "2+", label: "Năm kinh nghiệm" },
      ].map((s) => (
        <div
          key={s.label}
          className="p-3 rounded-xl border border-white/6 bg-white/2 text-center"
        >
          <p className="font-serif-display text-2xl text-orange-400 leading-none mb-1">
            {s.num}
          </p>
          <p className="font-mono-code text-[0.58rem] text-neutral-500 tracking-wider uppercase">
            {s.label}
          </p>
        </div>
      ))}
    </div>

    <div className="pt-2 flex flex-col gap-4">
      <a href="/cv" className="resume-btn w-fit">
        <ExternalLink size={13} /> Resume / CV
      </a>
      <SocialLinks />
    </div>
  </div>
);

const SkillsPanel = () => (
  <div className="space-y-6">
    <div>
      <p className="font-mono-code text-orange-400 text-[0.6rem] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
        <span className="w-4 h-px bg-orange-400 inline-block" /> Tech Stack
      </p>
      <h2 className="font-serif-display text-3xl sm:text-4xl text-black dark:text-white leading-tight mb-1">
        Kỹ năng<span className="text-orange-500">.</span>
      </h2>
      <p className="text-neutral-600 font-mono-code text-[0.62rem] tracking-widest mb-5">
        Always learning new technologies
      </p>
    </div>

    <div className="space-y-5">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.07, duration: 0.4 }}
        >
          <p className="font-mono-code text-[0.58rem] tracking-[0.18em] uppercase text-neutral-600 mb-2">
            {group.title}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 border border-gray-200 dark:border-neutral-700/50"
              >
                <span className="text-sm text-orange-400/80">{skill.icon}</span>
                <p className="text-black dark:text-white"> {skill.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const EducationPanel = () => (
  <div className="space-y-6">
    <div>
      <p className="font-mono-code text-orange-400 text-[0.6rem] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
        <span className="w-4 h-px bg-orange-400 inline-block" /> Đào tạo
      </p>
      <h2 className="font-serif-display text-3xl sm:text-4xl text-black dark:text-white leading-tight">
        Học vấn<span className="text-orange-500">.</span>
      </h2>
    </div>

    {/* School card */}
    <div className="p-5 rounded-2xl border border-white/8 bg-white/2 space-y-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0 mt-0.5">
          <FaGraduationCap size={16} className="text-orange-400" />
        </div>
        <div>
          <p className="text-black dark:text-white font-semibold text-sm leading-snug">
            Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM
          </p>
          <p className="text-xs flex items-center gap-1.5 mt-1 font-mono-code">
            <MdSchool size={12} /> ITC — Thiết Kế Trang Web
          </p>
        </div>
      </div>

      {/* GPA highlight */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-code text-[0.6rem] uppercase tracking-wider text-neutral-500">
              GPA
            </span>
            <span className="font-mono-code text-orange-400 text-xs">
              3.35 / 4.0
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "83.75%" }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"
            />
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-serif-display text-2xl text-orange-400 leading-none">
            Giỏi
          </p>
        </div>
      </div>

      {/* Info grid */}
      <div className="section-rule" style={{ margin: "4px 0 4px" }} />
      <div className="space-y-0">
        {studyInfo.slice(0, 6).map((item, i) => (
          <div key={i} className="info-row">
            <span className="font-mono-code text-[0.62rem] tracking-wide">
              {item.label}
            </span>
            <span className="text-black dark:text-white text-xs font-bold text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperiencePanel = () => (
  <div className="space-y-6">
    <div>
      <p className="font-mono-code text-orange-400 text-[0.6rem] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
        <span className="w-4 h-px bg-orange-400 inline-block" /> Career
      </p>
      <h2 className="font-serif-display text-3xl sm:text-4xl text-black dark:text-white leading-tight">
        Kinh nghiệm<span className="text-orange-500">.</span>
      </h2>
    </div>

    <div className="relative pl-5 border-l border-white/8 space-y-8">
      {experience.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="relative"
        >
          {/* dot */}
          <div
            className="tl-dot"
            style={{ background: "#f97316", borderColor: "#f97316" }}
          />

          <div className="space-y-1.5 ml-4">
            {/* Year badge */}
            <span className="font-mono-code text-[0.6rem] tracking-widest text-orange-400/70 uppercase">
              {item.year}
            </span>

            {/* Company */}
            <div className="flex items-center gap-2">
              <h3 className="text-black dark:text-white font-bold text-base">
                {item.company}
              </h3>
              {item.current && (
                <span className="font-mono-code text-[0.5rem] tracking-widest uppercase px-2 py-0.5 bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-full">
                  Now
                </span>
              )}
            </div>

            {/* Role */}
            <p className="text-sm">{item.role}</p>

            {/* Desc */}
            <p className="text-xs leading-relaxed text-justify pt-1">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}

      {/* future dot */}
      <div className="relative pl-0">
        <div
          className="tl-dot"
          style={{
            background: "transparent",
            borderColor: "rgba(255,255,255,0.1)",
            borderStyle: "dashed",
          }}
        />
        <p className="font-mono-code text-[0.58rem] text-neutral-700 tracking-widest uppercase ml-3">
          Chương tiếp theo...
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SLIDES CONFIG
───────────────────────────────────────────── */
const SLIDES = [
  {
    label: "Giới thiệu",
    icon: BookOpen,
    image: IMAGES.about_1,
    Panel: StoryPanel,
  },
  { label: "Kỹ năng", icon: Wrench, image: IMAGES.about_2, Panel: SkillsPanel },
  {
    label: "Học vấn",
    icon: GraduationCap,
    image: IMAGES.about_3,
    Panel: EducationPanel,
  },
  {
    label: "Kinh nghiệm",
    icon: Briefcase,
    image: IMAGES.about_4,
    Panel: ExperiencePanel,
  },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function About() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);

  const goTo = (n) => {
    if (n < 0 || n >= SLIDES.length) return;
    setActive(n);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) goTo(active + 1);
    if (dx > 50) goTo(active - 1);
  };

  const CurrentPanel = SLIDES[active].Panel;

  return (
    <article className="about-root min-h-scree">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="pb-6"
      >
        <p className="font-mono-code text-orange-400 text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-orange-400" /> About me
        </p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-serif-display text-5xl md:text-6xl text-black dark:text-white leading-none mb-2">
              Giới thiệu<span className="text-orange-500">.</span>
            </h1>
            <p className="text-sm">Một chút thú vị về mình</p>
          </div>
          {/* slide counter */}
          <span className="font-serif-display text-[4.5rem] text-black dark:text-white leading-none select-none hidden sm:block">
            {String(active + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-orange-500 via-orange-400/30 to-transparent" />
      </motion.div>

      {/* ── TAB NAV ── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SLIDES.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`tab-btn text-black dark:text-white ${active === i ? "active" : ""}`}
              >
                <Icon size={12} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="pb-16">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-0 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 border border-gray-200 dark:border-neutral-700/50 overflow-hidden">
          {/* LEFT — Image */}
          <div className="img-panel grain relative min-h-[320px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={SLIDES[active].image}
                alt={SLIDES[active].label}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* slide label on image */}
            <div className="absolute bottom-5 left-5 z-20">
              <p className="font-serif-display text-white/30 text-5xl leading-none select-none">
                {SLIDES[active].label}
              </p>
            </div>

            {/* vertical dot nav */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: active === i ? "8px" : "6px",
                    height: active === i ? "8px" : "6px",
                    borderRadius: "50%",
                    background:
                      active === i ? "#f97316" : "rgba(255,255,255,0.2)",
                    transform: active === i ? "scale(1)" : "scale(1)",
                    border:
                      active === i
                        ? "none"
                        : "1px solid rgba(255,255,255,0.15)",
                  }}
                  aria-label={SLIDES[i].label}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div
            className="content-scroll overflow-y-auto p-7 md:p-10"
            style={{ maxHeight: "700px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <CurrentPanel />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM NAV ARROWS ── */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="font-mono-code text-[0.62rem] tracking-widest uppercase hover:text-orange-400 transition-colors disabled:opacity-20 flex items-center gap-2"
          >
            ← {active > 0 ? SLIDES[active - 1].label : ""}
          </button>

          {/* progress bar */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                className="cursor-pointer transition-all duration-400 rounded-full"
                style={{
                  width: active === i ? "24px" : "6px",
                  height: "6px",
                  background: active === i ? "#f97316" : "rgba(0, 0, 0, 0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            disabled={active === SLIDES.length - 1}
            className="font-mono-code text-[0.62rem] tracking-widest uppercase text-neutral-500 hover:text-orange-400 transition-colors disabled:opacity-20 flex items-center gap-2"
          >
            {active < SLIDES.length - 1 ? SLIDES[active + 1].label : ""} →
          </button>
        </div>
      </div>
    </article>
  );
}
