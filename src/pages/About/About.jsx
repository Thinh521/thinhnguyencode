import { useState, useEffect, useRef } from "react";
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import { IMAGES } from "../../../public/images/imgaes";

/* ─── DATA ─────────────────────────────────────────────── */

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "ReactJS",
  "TailwindCSS",
  "GSAP",
  "Figma",
  "Photoshop",
];

const education = [
  {
    school: "Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)",
    major: "Thiết Kế Trang Web",
    year: "2022 – 2025",
  },
];

/* ─── SUB-COMPONENTS ────────────────────────────────────── */

/** Decorative section label */
const Tag = ({ children }) => (
  <div className="flex items-center gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-mono">
    <span className="block w-5 h-px bg-neutral-400 dark:bg-neutral-500 shrink-0" />
    {children}
  </div>
);

/** Big serif display heading */
const Display = ({ line1, line2 }) => (
  <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight mb-5 tracking-tight">
    {line1}
    <br />
    <em className="font-normal">{line2}</em>
  </h2>
);

/** Thin horizontal rule */
const HR = () => (
  <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-6" />
);

/* ─── SLIDE CONTENT PANELS ──────────────────────────────── */

const StoryContent = () => (
  <div>
    <Tag>Giới thiệu</Tag>
    <Display line1="Câu chuyện" line2="của mình" />
    <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 mb-3">
      Xin chào, mình là{" "}
      <span className="text-neutral-800 dark:text-neutral-200 font-medium">
        Thịnh
      </span>
      . Hiện tại mình là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web tại
      ITC.
    </p>
    <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      Mình đặc biệt yêu thích lập trình Frontend và đang trên hành trình trở
      thành một Frontend Developer thực thụ.
    </p>
    <HR />
    <Tag>Kết nối</Tag>
    <div className="flex flex-col gap-3">
      <Button className="w-[120px]" to="/cv">
        Resume
      </Button>
      <SocialLinks />
    </div>
  </div>
);

const SkillsContent = () => (
  <div>
    <Tag>Công nghệ</Tag>
    <Display line1="Kỹ năng" line2="& công cụ" />
    <div className="grid grid-cols-4 gap-2">
      {skills.map((skill) => (
        <div
          key={skill}
          className="
            py-2 px-1 text-center text-[10px] sm:text-[11px] tracking-wide font-mono
            border border-neutral-200 dark:border-neutral-800 rounded
            text-neutral-500 dark:text-neutral-400
            hover:border-neutral-400 dark:hover:border-neutral-500
            hover:text-neutral-900 dark:hover:text-neutral-100
            hover:bg-neutral-50 dark:hover:bg-neutral-900
            transition-all duration-200 cursor-default select-none
          "
        >
          {skill}
        </div>
      ))}
    </div>
    <HR />
    <Tag>Đang học thêm</Tag>
    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono tracking-wide">
      Next.js · TypeScript · Three.js
    </p>
  </div>
);

const EducationContent = () => (
  <div>
    <Tag>Đào tạo</Tag>
    <Display line1="Học vấn" line2="& nền tảng" />
    {education.map((item, i) => (
      <div
        key={i}
        className="
          p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg mb-3
          hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200
        "
      >
        <p className="text-xs sm:text-sm font-medium leading-snug mb-2 text-neutral-800 dark:text-neutral-200">
          {item.school}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
          <span>{item.major}</span>
          <span>{item.year}</span>
        </div>
      </div>
    ))}
    <HR />
    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
      Năm cuối — đang tìm kiếm cơ hội{" "}
      <span className="text-neutral-800 dark:text-neutral-200 font-medium">
        thực tập / fresher
      </span>
      .
    </p>
  </div>
);

const SLIDES = [
  { label: "Giới thiệu", number: "01", content: <StoryContent /> },
  { label: "Kỹ năng", number: "02", content: <SkillsContent /> },
  { label: "Học vấn", number: "03", content: <EducationContent /> },
];

const ACCENT_HEIGHTS = ["30%", "60%", "90%"];

/* ─── LEFT PANEL ────────────────────────────────────────── */

const LeftPanel = ({ active, onTouchStart, onTouchEnd }) => (
  <div
    className="
      relative flex flex-col items-center justify-center overflow-hidden
      bg-neutral-50 dark:bg-neutral-950
      border-b md:border-b-0 md:border-r
      border-neutral-200 dark:border-neutral-800
      h-28 sm:h-36 md:h-full
    "
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
  >
    {/* Accent line — vertical on md+, horizontal on mobile */}
    <div
      className="absolute top-0 left-0 hidden md:block w-0.5 bg-neutral-900 dark:bg-neutral-100 transition-all duration-700"
      style={{
        height: ACCENT_HEIGHTS[active],
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    />
    <div
      className="absolute top-0 left-0 block md:hidden h-0.5 bg-neutral-900 dark:bg-neutral-100 transition-all duration-700"
      style={{
        width: ACCENT_HEIGHTS[active],
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    />

    {/* Avatar — slide 0, md+ only */}
    <div
      className={`
        hidden md:flex items-center justify-center
        w-24 h-24 rounded-full overflow-hidden
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        font-serif italic text-4xl text-neutral-400 dark:text-neutral-600
        transition-all duration-500
        ${active === 0 ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-sm pointer-events-none absolute"}
      `}
    >
      {IMAGES?.avatar ? (
        <img
          src={IMAGES.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        "T"
      )}
    </div>

    {/* Slide number — md+, slides 1 & 2 */}
    <span
      className={`
        hidden md:block font-serif italic text-5xl
        text-neutral-300 dark:text-neutral-700
        transition-all duration-500 select-none
        ${active > 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 absolute pointer-events-none"}
      `}
    >
      {SLIDES[active].number}
    </span>

    {/* Mobile: number + label row */}
    <div className="md:hidden flex items-center gap-3">
      <span className="font-serif italic text-2xl text-neutral-300 dark:text-neutral-700 select-none">
        {SLIDES[active].number}
      </span>
      <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 font-mono">
        {SLIDES[active].label}
      </span>
    </div>

    {/* Label — md+ */}
    <p className="hidden md:block mt-4 text-[10px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 font-mono">
      {SLIDES[active].label}
    </p>

    {/* Counter — bottom-left, md+ */}
    <span className="absolute bottom-5 left-5 hidden md:block text-[10px] tracking-widest text-neutral-300 dark:text-neutral-700 font-mono select-none">
      {SLIDES[active].number} / 03
    </span>
  </div>
);

/* ─── MAIN ──────────────────────────────────────────────── */

const About = () => {
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState(false);
  const touchStartX = useRef(0);

  const goTo = (n) => {
    if (n === active || n < 0 || n > 2) return;
    setExiting(true);
    setTimeout(() => {
      setActive(n);
      setExiting(false);
    }, 280);
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

  return (
    <article>
      <Header
        title="Giới thiệu"
        subtitle="Một chút thú vị về mình và những điều lớn lao"
      />

      {/* ── DOT NAV ── */}
      <div className="flex justify-center items-center gap-2 pt-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Chuyển sang slide ${i + 1}`}
            className={`
              h-1.5 rounded-full border-none p-0 cursor-pointer outline-none
              transition-all duration-500
              ${
                active === i
                  ? "w-6 bg-neutral-900 dark:bg-neutral-100"
                  : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
              }
            `}
            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          />
        ))}
      </div>

      {/* ── SLIDER ── */}
      <div className="overflow-hidden mt-4">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${active * 100}%)`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {SLIDES.map((slide, slideIdx) => (
            <div
              key={slideIdx}
              className="
                w-full flex-shrink-0
                flex flex-col
                md:grid md:grid-cols-[2fr_3fr]
                min-h-[420px] sm:min-h-[480px]
              "
            >
              {/* LEFT */}
              <LeftPanel
                active={active}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              />

              {/* RIGHT */}
              <div
                className="p-6 sm:p-8 md:p-10 overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    opacity: exiting ? 0 : 1,
                    transform: exiting ? "translateY(14px)" : "translateY(0)",
                  }}
                >
                  {slide.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PREV / NEXT (mobile + tablet) ── */}
      <div className="flex justify-between items-center px-6 py-3 md:hidden">
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="
            text-[11px] font-mono tracking-widest uppercase
            text-neutral-400 dark:text-neutral-600
            disabled:opacity-20 disabled:cursor-not-allowed
            transition-opacity duration-200
          "
        >
          ← Trước
        </button>
        <span className="text-[10px] font-mono tracking-widest text-neutral-300 dark:text-neutral-700">
          {active + 1} / 3
        </span>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === 2}
          className="
            text-[11px] font-mono tracking-widest uppercase
            text-neutral-400 dark:text-neutral-600
            disabled:opacity-20 disabled:cursor-not-allowed
            transition-opacity duration-200
          "
        >
          Tiếp →
        </button>
      </div>

      <Divider className="my-10" />
    </article>
  );
};

export default About;
