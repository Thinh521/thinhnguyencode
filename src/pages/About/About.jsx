import { useState, useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaWordpress,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaGraduationCap,
  FaBriefcase,
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
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import { IMAGES } from "../../../public/images/imgaes";

/* DATA */
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
  { label: "Điểm trung bình (GPA)", value: "3.35 / 4.0" },
  { label: "Xếp loại", value: "Giỏi" },
  { label: "Thời gian", value: "2022 – 2025" },
];

const experience = [
  {
    year: "06/2025 – 12/2025",
    company: "Pione Group",
    role: "Thực tập sinh Mobile Developer (React Native)",
    desc: "Phát triển ứng dụng di động bằng React Native, triển khai giao diện từ thiết kế Figma, tích hợp RESTful API, làm việc với Firebase và Smart Contract cho các chức năng dữ liệu thời gian thực.",
  },
  {
    year: "2026 – Hiện tại",
    company: "Freelance",
    role: "Web Developer",
    desc: "Xây dựng ứng dụng web như một sở thích.",
  },
];

/* UI COMPONENTS */

const Tag = ({ children }) => (
  <div className="flex items-center gap-2 mb-5 text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-mono">
    <span className="block w-5 h-px bg-neutral-400 shrink-0" />
    {children}
  </div>
);

const Display = ({ title }) => (
  <h2 className="font-playfair text-2xl sm:text-3xl font-semibold leading-tight mb-5 tracking-tight">
    {title}
  </h2>
);

const HR = () => (
  <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-6" />
);

/* CONTENT */
const StoryContent = () => (
  <div>
    <Tag>Giới thiệu</Tag>
    <Display title="Câu chuyện của mình" />

    <p className="text-sm text-neutral-500 leading-relaxed text-justify">
      Xin chào, mình xin phép được chia sẻ nhiều hơn về hành trình của mình.
      Hiện tại, mình đang là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
      tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC). Hiện tại mình đang
      sinh sống và làm việc tại TP.HCM. Đây là giai đoạn mình đang dồn hết tâm
      huyết của mình cho các dự án tốt nghiệp, mà Website cá nhân này chính là
      một trong những dự án tâm đắc nhất của mình. Mục tiêu của website này là
      một không gian toàn diện hiện đại, thân thiện và đẹp mắt để: giới thiệu
      bản thân, trưng bày các dự án đã thực hiện, chia sẻ học vấn, và đặc biệt
      là nơi lưu giữ những hình ảnh, âm nhạc, những câu chuyện, thành tựu cá
      nhân mình đã trải qua và có được trong hành trình của mình. Mình có niềm
      yêu thích đặc biệt với lập trình giao diện (Frontend) và đang không ngừng
      tự học thêm các ngôn ngữ lập trình chuyên sâu hơn để có thể xây dựng những
      ứng dụng (App), website hoàn chỉnh, hiện đại và độc đáo. Cùng với khát
      vọng trở thành một Frontend Developer chuyên nghiệp trong tương lai. Bên
      cạnh kiến thức lập trình. Nhà trường cũng đã trang bị thêm kiến thức nền
      tảng cho mình về thiết kế và sáng tạo. Mình cũng học được các kỹ năng đủ
      để thiết kế được các Poster. Tuy nhiên, Mình không ngừng tự thử thách bản
      thân. Mình đang trên hành trình học hỏi không ngừng để hoàn thiện sâu hơn
      nữa kỹ năng chuyên môn và tư duy thiết kế, nhằm tạo ra những sản phẩm
      không chỉ đẹp mà còn mang tính ứng dụng cao và đột phá. Ngoài ra, mình cực
      kỳ đam mê quay phim và chụp ảnh. Sở thích này không chỉ là giải trí mà còn
      là cách mình lưu giữ trọn vẹn những khoảnh khắc đáng nhớ nhất của bản
      thân, gia đình, bạn bè và người yêu của mình. Mình muốn dùng "góc kính
      nhiệm màu" của mình để truyền tải đến mọi người những gì mình thấy là đẹp
      đẽ, đáng yêu và ý nghĩa nhất trong cuộc sống của mình.
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
    <Display title="Kỹ năng" />

    <div className="flex flex-col gap-6">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold mb-2 text-neutral-700">
            {group.title}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {group.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 py-2 px-3 border rounded text-xs text-neutral-600 hover:bg-neutral-100 transition"
              >
                <span className="text-base">{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <HR />

    <p className="text-xs text-neutral-500 font-mono">
      Always learning new technologies 🚀
    </p>
  </div>
);

const EducationContent = () => (
  <div>
    <Tag>Đào tạo</Tag>
    <Display title="Học vấn" />

    <div className="p-5 border rounded-xl mt-4 bg-neutral-50 dark:bg-neutral-900">
      {/* School */}
      <div className="flex items-center gap-3 mb-4">
        <FaGraduationCap className="text-lg text-neutral-600" />
        <div>
          <p className="text-sm font-semibold">
            Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-2">
            <MdSchool />
            Chuyên ngành Thiết Kế Trang Web
          </p>
        </div>
      </div>

      {/* Study info */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
        {studyInfo.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-neutral-400">{item.label}</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceContent = () => (
  <div>
    <Tag>Kinh nghiệm</Tag>
    <Display title="Kinh nghiệm làm việc" />

    <div className="relative border-l mt-6 ml-3">
      {experience.map((item, i) => (
        <div key={i} className="mb-8 ml-6">
          {/* icon */}
          <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white border rounded-full">
            <FaBriefcase className="text-xs text-neutral-500" />
          </span>

          {/* year */}
          <p className="text-xs text-neutral-400 font-mono mb-1">{item.year}</p>

          {/* company */}
          <h3 className="text-base font-semibold">{item.company}</h3>

          {/* role */}
          <p className="text-sm text-neutral-600 mb-1">{item.role}</p>

          {/* description */}
          <p className="text-xs text-neutral-500 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

/* SLIDES */
const SLIDES = [
  {
    label: "Giới thiệu",
    image: IMAGES.about_1,
    content: <StoryContent />,
  },
  {
    label: "Kỹ năng",
    image: IMAGES.about_2,
    content: <SkillsContent />,
  },
  {
    label: "Học vấn",
    image: IMAGES.about_3,
    content: <EducationContent />,
  },
  {
    label: "Kinh nghiệm",
    image: IMAGES.about_4,
    content: <ExperienceContent />,
  },
];

/* MAIN */
const About = () => {
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

  return (
    <article className="relative">
      <Header title="Giới thiệu" subtitle="Một chút thú vị về mình" />

      {/* SLIDER */}
      <div className="overflow-hidden mt-4">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${active * 100}%)`,
          }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="
                          w-full
                          flex-shrink-0
                          flex flex-col
                          md:grid md:grid-cols-[2fr_3fr]
                        "
            >
              {/* IMAGE */}
              <div className="h-[400px] md:h-[600px] overflow-hidden">
                <img
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div
                className="py-8 lg:p-8"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING DOT NAV */}

      <div
        className="
        fixed
        right-6
        top-1/2
        -translate-y-1/2
        z-50
        flex
        flex-col
        gap-3
      "
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              w-2.5 h-2.5
              rounded-full
              transition-all
              duration-300
              
              ${
                active === i
                  ? "bg-black scale-125"
                  : "bg-neutral-300 hover:bg-neutral-500"
              }
            `}
          />
        ))}
      </div>

      <Divider className="my-10" />
    </article>
  );
};

export default About;
