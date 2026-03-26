import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Camera,
  Sparkles,
  Zap,
  Layers,
  GitBranch,
  User,
} from "lucide-react";
import Divider from "../../components/Divider/Divider";
import DevIntro from "./components/DevIntro";
import { timelineData } from "../../data/timelineData";
import PhotoData from "../../data/PhotoData";
import PhotoThumbnail from "../Photo/components/PhotoThumbnail ";
import PhotoModal from "../Photo/components/PhotoModal";
import SectionLabel from "../../components/SectionLabel";
import PageHeader from "../../components/layout/PageHeader";
import FeaturedProjects from "../../components/Project/FeaturedProjects/FeaturedProjects";
import TechMarquee from "./components/TechMarquee";
import BottomCTA from "./components/BottomCTA";
import AboutSection from "./components/AboutSection";

/* ─────────────────────────────────────────────
   FONTS + GLOBAL STYLES
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

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
  `}</style>
);

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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Nguyễn Phúc Thịnh"
          subtitle="Mobile App Developer • Freelancer"
          verified
        />
      </motion.div>

      <section>
        <SectionLabel icon={User}>Giới thiệu</SectionLabel>
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
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 shadow-sm">
          {STATS.map((s, i) => (
            <div key={s.label} className="relative text-center p-4">
              {i !== 0 && (
                <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-neutral-300 dark:bg-neutral-600" />
              )}
              <p className="text-4xl font-serif leading-none mb-1 text-neutral-900 dark:text-white">
                {s.value}
              </p>
              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                {s.label}
              </p>
              <p className="text-[0.62rem] tracking-widest uppercase mt-0.5 text-black/30 dark:text-white/25">
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
                        bg-neutral-200/20 dark:bg-neutral-700/20 hover:border-primary-400/50 hover:dark:border-primary-400/50
                        hover:bg-primary-400/10 hover:dark:bg-primary-400/10 transition-all duration-300"
            >
              <div className="p-2.5 rounded-xl w-fit mb-4 border border-primary-500/20 bg-primary-500/10">
                <svc.icon size={16} className="text-primary-500" />
              </div>
              <h3 className="text-neutral-900 dark:text-white font-semibold text-sm mb-1.5">
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
          ABOUT
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
        <AboutSection />
      </motion.section>

      <>
        <SectionLabel icon={Layers}>Kỹ năng</SectionLabel>
        <TechMarquee />
      </>

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
          <SectionLabel icon={Code2} className="!mb-0">
            Dự án nổi bật
          </SectionLabel>
          <Link
            to="/projects"
            className="flex items-center gap-1.5 text-xs uppercase transition-colors text-neutral-900 dark:text-white hover:text-primary-500"
          >
            Tất cả <ArrowRight size={11} />
          </Link>
        </div>
        <FeaturedProjects projects={featuredProjects} />
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
        <div className="flex items-center justify-between">
          <SectionLabel icon={Code2}>Ảnh nổi bật</SectionLabel>
          <Link
            to="/photos"
            className="flex items-center gap-1.5 text-xs uppercase transition-colors text-black dark:text-white hover:text-primary-500"
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
        <BottomCTA />
      </motion.section>
    </article>
  );
}
