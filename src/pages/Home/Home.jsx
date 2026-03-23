import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Camera,
  MapPin,
  Download,
  ExternalLink,
  Star,
  Sparkles,
  ChevronDown,
  Zap,
  Layers,
  GitBranch,
} from "lucide-react";
import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import DevIntro from "./components/DevIntro";
import { timelineData } from "../../data/timelineData";
import { IMAGES } from "../../../public/images/imgaes";
import PhotoData from "../../data/PhotoData";
import PhotoThumbnail from "../Photo/components/PhotoThumbnail ";
import PhotoModal from "../Photo/components/PhotoModal";

/* ─────────────────────────────────────────────
   FONTS + GLOBAL STYLES
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .home-root { font-family: 'Syne', sans-serif; }
    .font-serif { font-family: 'Instrument Serif', serif; }
    .font-mono  { font-family: 'JetBrains Mono', monospace; }

    /* Noise texture */
    .noise-bg::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    /* Section divider */
    .s-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.45), rgba(255,255,255,0.04), transparent);
    }

    /* Animated gradient text */
    @keyframes gradientShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    .gradient-text {
      background: linear-gradient(135deg, #f97316 0%, #fbbf24 35%, #fb923c 65%, #f97316 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradientShift 4s ease infinite;
    }

    /* Blinking cursor */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { animation: blink 1.1s step-end infinite; }

    /* Skill badge */
    .skill-badge {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: 99px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; letter-spacing: 0.05em;
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .skill-badge:hover {
      border-color: rgba(249,115,22,0.35);
      background: rgba(249,115,22,0.06);
      color: rgba(255,255,255,0.85);
    }

    /* Project card */
    .proj-mini {
 border-radius: 14px;
      overflow: hidden;
      transition: border-color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s;
      text-decoration: none; display: block;
    }
    .proj-mini:hover {
      border-color: rgba(249,115,22,0.3);
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
    }
    .proj-mini img {
      width: 100%; height: 160px; object-fit: cover; display: block;
      transition: transform 0.7s ease, filter 0.5s;
    }
    .proj-mini:hover img {
      transform: scale(1.06);
      filter: brightness(0.92) saturate(1.05);
    }

    /* Resume btn */
    .resume-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 24px; border-radius: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: white; text-decoration: none; cursor: pointer;
      transition: background 0.25s, box-shadow 0.25s;
    }
    .resume-btn:hover {
      background: rgba(249,115,22,0.26);
      box-shadow: 0 0 28px rgba(249,115,22,0.22);
    }

    /* Avatar glow */
    @keyframes avatarPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0); }
      50%      { box-shadow: 0 0 0 12px rgba(249,115,22,0.08); }
    }
    .avatar-glow { animation: avatarPulse 4s ease-in-out infinite; }

    /* Marquee tech */
    @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    .tech-marquee { animation: marquee 20s linear infinite; }
    .tech-marquee-wrap:hover .tech-marquee { animation-play-state: paused; }
    .tech-fade {
      mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    }

    /* Stat card */
    .stat-card {
      border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
      background: rgba(255,255,255,0.02); padding: 20px;
      transition: border-color 0.25s;
    }
    .stat-card:hover { border-color: rgba(249,115,22,0.25); }

    /* Available badge pulse */
    @keyframes availPulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.5); opacity: 0.4; }
    }
    .avail-dot::after {
      content: ''; position: absolute; inset: 0; border-radius: 50%;
      background: #4ade80;
      animation: availPulse 2s ease-in-out infinite;
    }

    /* Section label */
    .sec-label {
      display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
    }
    .sec-label-icon {
      padding: 6px; border-radius: 8px;
      background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.2);
    }
    .sec-label-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    }
    .sec-label-rule {
      flex: 1; height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.3), transparent);
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SKILLS_MAIN = [
  { icon: Smartphone, label: "React Native" },
  { icon: Globe, label: "React.js" },
  { icon: Code2, label: "JavaScript" },
  { icon: Layers, label: "Next.js" },
  { icon: GitBranch, label: "Blockchain" },
  { icon: Zap, label: "TailwindCSS" },
  { icon: Camera, label: "Figma" },
];

const SERVICES = [
  {
    icon: Smartphone,
    title: "Mobile App",
    desc: "React Native cross-platform apps cho iOS & Android",
  },
  {
    icon: Globe,
    title: "Web Frontend",
    desc: "Giao diện React.js hiện đại, responsive & performant",
  },
  {
    icon: GitBranch,
    title: "Blockchain",
    desc: "Smart Contract, NFT Marketplace, DeFi application",
  },
  {
    icon: Camera,
    title: "UI/UX Design",
    desc: "Thiết kế Figma, prototype và design system",
  },
];

const STATS = [
  { value: "7+", label: "Dự án", sub: "completed" },
  { value: "3.35", label: "GPA", sub: "out of 4.0" },
  { value: "2+", label: "Năm", sub: "experience" },
  { value: "100%", label: "Commitment", sub: "always" },
];

const TECH_STACK = [
  "React Native",
  "React.js",
  "Next.js",
  "JavaScript",
  "Node.js",
  "Firebase",
  "TailwindCSS",
  "Blockchain",
  "Figma",
  "Smart Contract",
  "MongoDB",
  "Express",
  "React Native",
  "React.js",
  "Next.js",
  "JavaScript",
  "Node.js",
  "Firebase",
  "TailwindCSS",
  "Blockchain",
  "Figma",
  "Smart Contract",
  "MongoDB",
  "Express",
];

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="sec-label">
      <div className="sec-label-icon">
        <Icon size={12} className="text-orange-400" />
      </div>
      <span className="sec-label-text text-black dark:text-white">
        {children}
      </span>
      <div className="sec-label-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────── */
const ROLES = [
  "Mobile App Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
  "Blockchain Developer",
  "Creative Coder",
];

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Home() {
  const containerRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const featuredProjects = timelineData.slice(0, 3);

  return (
    <article className="home-root noise-bg min-h-screen" ref={containerRef}>
      <FontLoader />

      <Header
        title="Nguyễn Phúc Thịnh"
        subtitle="Mobile App Developer • Freelancer"
        verified={true}
      />

      <section>
        <SectionTitle className="mb-2">Giới thiệu</SectionTitle>
        <p className="text-sm text-justify leading-relaxed">
          Xin chào, mình là Nguyễn Phúc Thịnh, sinh viên chuyên ngành Thiết Kế
          Trang Web tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC). Với
          niềm đam mê sâu sắc dành cho lập trình và sáng tạo giao diện người
          dùng (UI/UX), mình không ngừng học hỏi và phát triển kỹ năng mỗi ngày.
          Lập trình là nền tảng, nhưng mình còn có sở thích đặc biệt với thiết
          kế, chụp ảnh và quay dựng (Video Editing). Chính những sở thích này đã
          thúc đẩy mình tự trau dồi thêm các kỹ năng về thiết kế đồ họa và biên
          tập nội dung, tạo nên một lợi thế toàn diện. Hiện tại, mình đang từng
          bước chinh phục mục tiêu trở thành một Frontend Developer chuyên
          nghiệp. Mình tin rằng sự kết hợp giữa kiến thức chuyên ngành và các kỹ
          năng sáng tạo sẽ giúp mình thực hiện những dự án lớn, đóng góp giá trị
          thiết thực vào ngành công nghệ trong tương lai.
        </p>
      </section>

      <Divider className="mt-6" />

      <section className="flex justify-center items-center w-full h-full">
        <DevIntro />
      </section>

      <Divider className="my-10" />

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-16"
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700/80
                  bg-neutral-200/20 dark:bg-neutral-700/20 shadow-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="
          text-center p-4
          relative
        "
            >
              {i !== 0 && (
                <span
                  className="
            hidden md:block
            absolute left-0 top-1/2 -translate-y-1/2
            w-px h-10
            bg-neutral-300 dark:bg-neutral-600
          "
                />
              )}

              <p className="text-4xl font-serif leading-none mb-1 text-black dark:text-white">
                {s.value}
              </p>

              <p className="font-mono text-[0.62rem] tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                {s.label}
              </p>

              <p className="font-mono text-[0.54rem] tracking-widest uppercase mt-0.5 text-black/30 dark:text-white/25">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <SectionLabel icon={Zap}>Dịch vụ</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="p-5 rounded-xl group cursor-pointer border border-neutral-200/80 dark:border-neutral-700/80
                        bg-neutral-200/20 dark:bg-neutral-700/20 hover:border-orange-400/50 hover:dark:border-orange-400/50
                        hover:bg-orange-400/10 hover:dark:bg-orange-400/10 transition-all duration-300"
            >
              <div
                className="p-2.5 rounded-xl w-fit mb-4"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                <svc.icon size={16} className="text-orange-400" />
              </div>
              <h3 className="text-black dark:text-white font-semibold text-sm mb-1.5">
                {svc.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          ABOUT (2-col)
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-16"
      >
        <div className="s-rule mb-10" />
        <SectionLabel icon={Sparkles}>Về mình</SectionLabel>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
          {/* Left: Bio text */}
          <div>
            <h2 className="font-serif text-4xl text-black dark:text-white leading-tight mb-5">
              Xin chào, mình là
              <br />
              <span className="gradient-text">Thịnh</span>
              <span className="text-orange-500">.</span>
            </h2>
            <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 leading-[1.85]">
              <p>
                Hiện là sinh viên năm cuối chuyên ngành{" "}
                <span className="text-orange-400">Thiết Kế Trang Web</span> tại
                Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC).
              </p>
              <p>
                Có niềm đam mê đặc biệt với{" "}
                <span className="text-black dark:text-white">
                  lập trình giao diện (Frontend)
                </span>{" "}
                và không ngừng tự học để xây dựng những ứng dụng hiện đại, độc
                đáo. Mình cũng từng tham gia hackathon{" "}
                <span className="text-orange-400">Blockchain & AI</span> trong
                quá trình thực tập.
              </p>
              <p>
                Ngoài lập trình, mình còn đam mê{" "}
                <span className="text-black dark:text-white">
                  quay phim & chụp ảnh
                </span>{" "}
                — lưu giữ những khoảnh khắc đáng nhớ nhất qua ống kính.
              </p>
            </div>

            <div className="mt-6">
              <Link
                to="/about"
                className="resume-btn bg-orange-400 border-orange-400"
                style={{ display: "inline-flex" }}
              >
                Xem thêm <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Right: Info grid */}
          <div className="space-y-3">
            {[
              { label: "Tên", value: "Nguyễn Phúc Thịnh" },
              { label: "Trường", value: "ITC TP.HCM" },
              { label: "Chuyên ngành", value: "Thiết Kế Trang Web" },
              { label: "GPA", value: "3.35 / 4.0 — Giỏi" },
              { label: "Địa điểm", value: "TP. Hồ Chí Minh" },
              { label: "Tình trạng", value: "Đã tốt nghiệp ✓" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 py-2.5 border-b border-black/10 dark:border-white/10"
              >
                <span className="font-mono text-[0.6rem] text-neutral-600 dark:text-neutral-400  tracking-widest uppercase shrink-0">
                  {label}
                </span>
                <span className="text-black dark:text-white text-xs font-medium text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          TECH MARQUEE
      ══════════════════════════════════════ */}
      <SectionLabel icon={Layers}>Kỹ năng</SectionLabel>
      <div className="mb-16 overflow-hidden tech-fade tech-marquee-wrap py-2">
        <div className="flex gap-4 tech-marquee">
          {TECH_STACK.map((t, i) => (
            <span
              key={i}
              className="skill-badge text-black dark:text-white shrink-0 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="s-rule mb-10" />
        <div className="flex items-center justify-between mb-6">
          <SectionLabel icon={Code2}>Dự án nổi bật</SectionLabel>
          <Link
            to="/projects"
            className="font-mono text-[0.62rem] tracking-widest uppercase flex items-center gap-1.5 transition-colors"
            style={{ color: "rgba(249,115,22,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(249,115,22,0.7)")
            }
          >
            Tất cả <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.09,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="proj-mini bg-white/40 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200 dark:border-white/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.images?.[0]}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(0,0,0,0.6)",
                        border: "1px solid rgba(249,115,22,0.3)",
                        color: "#f97316",
                      }}
                    >
                      {project.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-black dark:text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
                    {project.title}
                  </p>
                  <p className="font-mono text-[0.58rem] text-neutral-500 dark:text-neutral-400 tracking-wide">
                    {project.duration}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.skills?.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[0.54rem] tracking-wide uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(249,115,22,0.08)",
                          border: "1px solid rgba(249,115,22,0.2)",
                          color: "rgba(249,115,22,0.7)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          FEATURED PHOTOS
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="s-rule mb-10" />
        <div className="flex items-center justify-between mb-6">
          <SectionLabel icon={Code2}>Ảnh nổi bật</SectionLabel>
          <Link
            to="/photos"
            className="font-mono text-[0.62rem] tracking-widest uppercase flex items-center gap-1.5 transition-colors"
            style={{ color: "rgba(249,115,22,0.7)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f97316")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(249,115,22,0.7)")
            }
          >
            Tất cả <ArrowRight size={11} />
          </Link>
        </div>

        <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="columns-2 md:columns-3 gap-3"
        >
          {PhotoData.slice(0, 6).map((photo, idx) => (
            <PhotoThumbnail
              key={photo.id}
              photo={photo}
              idx={idx}
              onOpen={setSelectedPhoto}
            />
          ))}
        </motion.div>
      </motion.section>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />

      {/* ══════════════════════════════════════
          CTA BOTTOM
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="s-rule mb-10" />
        <div
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center grain"
          style={{
            background: "rgba(249,115,22,0.05)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: "200px",
              background:
                "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <p className="font-mono text-orange-400 text-[0.65rem] tracking-[0.25em] uppercase mb-4 relative z-10">
            ◆ Hãy kết nối
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-black dark:text-white leading-tight mb-4 relative z-10">
            Cùng tạo ra điều
            <br />
            <span className="gradient-text">tuyệt vời</span>
          </h2>
          <p
            className="text-sm max-w-sm mx-auto mb-8 relative z-10 text-neutral-600 dark:text-neutral-400"
            style={{ lineHeight: 1.8 }}
          >
            Mình luôn sẵn sàng hợp tác cho các dự án thú vị — freelance hoặc
            full-time.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap relative z-10">
            <Link
              to="/contact"
              className="resume-btn bg-orange-400 border-orange-400"
            >
              Liên hệ ngay <ArrowRight size={13} />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[0.7rem] tracking-widest uppercase transition-all border border-orange-400 text-orange-400"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              }}
            >
              Xem dự án <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </motion.section>
    </article>
  );
}
