import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import { ExternalLink } from "lucide-react";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import { IMAGES } from "../../../public/images/imgaes";
import Button from "../../components/Button/Button";
import PageHeader from "../../components/layout/PageHeader";

/* ─────────────────────────────────────────────
   FONTS + LOCAL STYLES
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .skill-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.68rem; color: rgba(255,255,255,0.65);
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .skill-item:hover {
      border-color: rgba(249,115,22,0.35);
      background: rgba(249,115,22,0.05);
    }

    .info-row {
      display: flex; justify-content: space-between; align-items: baseline;
      gap: 12px; padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .info-row:last-child { border-bottom: none; }

    .tl-dot {
      position: absolute;
      left: -5px; top: 9px;
      width: 10px; height: 10px;
      border-radius: 50%;
      border: 2px solid #f97316;
      background: #0a0a0a;
    }

    .grain { position: relative; }
    .grain::after {
      content: '';
      position: absolute; inset: 0; pointer-events: none; z-index: 1;
      background-image: url("data?:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 150px;
    }

    .chapter-img {
      overflow: hidden;
    }
    .chapter-img img {
      transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .chapter-img:hover img {
      transform: scale(1.045);
    }

    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
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

const STATS = [
  { value: "7+", label: "Dự án" },
  { value: "3.35", label: "GPA / 4.0" },
  { value: "2+", label: "Kinh nghiệm" },
  { value: "100%", label: "Commitment" },
];

/* ─────────────────────────────────────────────
   CHAPTER LAYOUT
   Ảnh "dính" (sticky) khi cuộn ở một bên, nội dung
   cuộn tự nhiên ở bên còn lại — xen kẽ trái/phải
   giữa các chương để tạo nhịp điệu thị giác.
───────────────────────────────────────────── */
const Chapter = ({ number, title, image, imageOnRight = false, children }) => (
  <section className="relative mb-28 md:mb-40">
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
      <div
        className={`${imageOnRight ? "md:order-2" : "md:order-1"} md:sticky md:top-28`}
      >
        <div className="chapter-img grain relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-200/80 dark:border-neutral-700/80">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className={imageOnRight ? "md:order-1" : "md:order-2"}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-xs text-primary-400 tracking-widest">
              {number}
            </span>
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl text-black dark:text-white leading-tight mb-7">
            {title}
            <span className="text-primary-500">.</span>
          </h2>
          {children}
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <article className="min-h-screen">
      <FontLoader />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14 md:mb-20"
      >
        <PageHeader title="Giới thiệu." subtitle="Một chút thú vị về mình" />
      </motion.div>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative grid md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-16 items-center mb-28 md:mb-40"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative rounded-2xl overflow-hidden aspect-[4/5] border border-neutral-200/80 dark:border-neutral-700/80 order-1"
        >
          <motion.img
            src={IMAGES.about_1}
            alt="Nguyễn Phúc Thịnh"
            style={{ scale: heroImgScale, y: heroImgY }}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <p className="text-[0.95rem] md:text-base leading-relaxed text-justify text-neutral-700 dark:text-neutral-300 max-w-lg mb-8">
            Tôi là Thịnh là sinh viên đã tốt nghiệp ngành Thiết Kế Trang Web tại
            Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC), đang theo đuổi
            hành trình trở thành một Frontend Developer chuyên nghiệp
          </p>

          <div className="flex items-center gap-6 md:gap-8 mb-9 flex-wrap">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 md:gap-8">
                {i !== 0 && (
                  <span className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />
                )}
                <div>
                  <p className="font-playfair text-2xl text-black dark:text-white leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-[0.65rem] tracking-wide text-neutral-500 dark:text-neutral-400">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <Button
              to="/cv"
              leftIcon={<ExternalLink size={13} />}
              className="max-w-max"
            >
              Resume / CV
            </Button>
            <SocialLinks />
          </div>
        </motion.div>
      </section>

      {/* ── 01 · CÂU CHUYỆN ── */}
      <Chapter number="01" title="Câu chuyện" image={IMAGES.about_2}>
        <div className="space-y-5">
          <p className="text-[0.95rem] leading-relaxed text-justify text-neutral-700 dark:text-neutral-300 first-letter:text-4xl first-letter:font-bold first-letter:text-primary-500 first-letter:mr-2 first-letter:float-left">
            Xin chào, mình xin phép được chia sẻ nhiều hơn về hành trình của
            mình. Hiện tại, mình đang là sinh viên năm cuối chuyên ngành Thiết
            Kế Trang Web tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC).
            Hiện tại mình đang sinh sống và làm việc tại TP.HCM. Đây là giai
            đoạn mình đang dồn hết tâm huyết của mình cho các dự án tốt nghiệp,
            mà Website cá nhân này chính là một trong những dự án tâm đắc nhất
            của mình. Mục tiêu của website này là một không gian toàn diện hiện
            đại, thân thiện và đẹp mắt để: giới thiệu bản thân, trưng bày các dự
            án đã thực hiện, chia sẻ học vấn, và đặc biệt là nơi lưu giữ những
            hình ảnh, âm nhạc, những câu chuyện, thành tựu cá nhân mình đã trải
            qua và có được trong hành trình của mình.
          </p>

          <div className="border-l-2 border-primary-500/60 pl-4 italic text-[0.9rem] text-neutral-600 dark:text-neutral-400">
            Mình có niềm yêu thích đặc biệt với lập trình giao diện (Frontend)
            và đang không ngừng tự học thêm các ngôn ngữ lập trình chuyên sâu
            hơn để có thể xây dựng những ứng dụng (App), website hoàn chỉnh,
            hiện đại và độc đáo.
          </div>

          <p className="text-[0.95rem] leading-relaxed text-justify text-neutral-700 dark:text-neutral-300">
            Cùng với khát vọng trở thành một Frontend Developer chuyên nghiệp
            trong tương lai. Bên cạnh kiến thức lập trình. Nhà trường cũng đã
            trang bị thêm kiến thức nền tảng cho mình về thiết kế và sáng tạo.
            Mình cũng học được các kỹ năng đủ để thiết kế được các Poster. Tuy
            nhiên, Mình không ngừng tự thử thách bản thân. Mình đang trên hành
            trình học hỏi không ngừng để hoàn thiện sâu hơn nữa kỹ năng chuyên
            môn và tư duy thiết kế, nhằm tạo ra những sản phẩm không chỉ đẹp mà
            còn mang tính ứng dụng cao và đột phá.
          </p>

          <blockquote className="text-[0.9rem] leading-relaxed text-neutral-600 dark:text-neutral-400 border-l-2 border-neutral-300 dark:border-neutral-600 pl-4">
            Ngoài ra, mình cực kỳ đam mê quay phim và chụp ảnh. Sở thích này
            không chỉ là giải trí mà còn là cách mình lưu giữ trọn vẹn những
            khoảnh khắc đáng nhớ nhất của bản thân, gia đình, bạn bè và người
            yêu của mình. Mình muốn dùng "góc kính nhiệm màu" của mình để truyền
            tải đến mọi người những gì mình thấy là đẹp đẽ, đáng yêu và ý nghĩa
            nhất trong cuộc sống của mình.
          </blockquote>
        </div>
      </Chapter>

      {/* ── 02 · HỌC VẤN ── */}
      <Chapter number="02" title="Học vấn" image={IMAGES.about_3} imageOnRight>
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary-500/10 border border-primary-500/20 shrink-0 mt-0.5">
            <FaGraduationCap size={16} className="text-primary-400" />
          </div>
          <div>
            <p className="text-neutral-900 dark:text-white font-semibold text-sm leading-snug">
              Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM
            </p>
            <p className="text-xs flex items-center gap-1.5 mt-1 text-neutral-500 dark:text-neutral-400">
              <MdSchool size={12} /> ITC — Thiết Kế Trang Web
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[0.6rem] uppercase tracking-wider text-neutral-500">
                GPA
              </span>
              <span className="text-primary-400 text-xs">3.35 / 4.0</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 dark:bg-white/6 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "83.75%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 to-primary-300 rounded-full"
              />
            </div>
          </div>
          <p className="font-playfair text-2xl text-primary-400 leading-none shrink-0">
            Giỏi
          </p>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2">
          {studyInfo.map((item, i) => (
            <div key={i} className="info-row">
              <span className="text-xs tracking-wide text-neutral-500 dark:text-neutral-400">
                {item.label}
              </span>
              <span className="text-neutral-900 dark:text-white text-xs font-bold text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── 03 · KINH NGHIỆM ── */}
      <Chapter number="03" title="Kinh nghiệm" image={IMAGES.about_4}>
        <div className="relative pl-5 border-l border-neutral-200 dark:border-white/10 space-y-9">
          {experience.map((item, i) => (
            <div key={i} className="relative">
              <div className="tl-dot" />
              <div className="space-y-1.5 ml-1">
                <span className="text-[0.6rem] tracking-widest text-primary-400 uppercase">
                  {item.year}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-neutral-900 dark:text-white font-bold text-base">
                    {item.company}
                  </h3>
                  {item.current && (
                    <span className="text-[0.5rem] tracking-widest uppercase px-2 py-0.5 bg-primary-500/15 border border-primary-500/30 text-primary-400 rounded-full">
                      Now
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-200">
                  {item.role}
                </p>
                <p className="text-sm leading-relaxed text-justify pt-1 text-neutral-600 dark:text-neutral-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          <div className="relative">
            <div
              className="tl-dot"
              style={{
                background: "transparent",
                borderColor: "rgba(120,120,120,0.35)",
                borderStyle: "dashed",
              }}
            />
            <p className="text-[0.58rem] text-neutral-500 tracking-widest uppercase ml-1">
              Chương tiếp theo...
            </p>
          </div>
        </div>
      </Chapter>

      {/* ── 04 · KỸ NĂNG ── */}
      <Chapter number="04" title="Kỹ năng" image={IMAGES.about_1} imageOnRight>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs tracking-widest mb-6">
          Luôn luôn học hỏi những công nghệ mới
        </p>
        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[0.58rem] tracking-[0.18em] uppercase text-neutral-900 dark:text-white font-bold mb-2.5">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-item bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/80"
                  >
                    <span className="text-sm text-primary-400">
                      {skill.icon}
                    </span>
                    <p className="text-neutral-900 dark:text-white">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ── CLOSING ── */}
      <section className="pb-20 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl text-black dark:text-white mb-8 max-w-xl mx-auto"
        >
          Cảm ơn vì đã đọc đến đây<span className="text-primary-500">.</span>
        </motion.p>
        <div className="flex flex-col items-center gap-5">
          <Button
            to="/cv"
            leftIcon={<ExternalLink size={13} />}
            className="max-w-max"
          >
            Resume / CV
          </Button>
          <SocialLinks />
        </div>
      </section>
    </article>
  );
}
