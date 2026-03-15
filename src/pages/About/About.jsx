import { useState, useEffect, useRef } from "react";
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import { IMAGES } from "../../../public/images/imgaes";

/* DATA */

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

const experience = [
  {
    company: "Freelance Frontend",
    role: "Frontend Developer",
    year: "2024 – Hiện tại",
    desc: "Thiết kế và xây dựng giao diện website bằng ReactJS, TailwindCSS và GSAP.",
  },
  {
    company: "Dự án cá nhân",
    role: "Frontend Developer",
    year: "2023 – 2024",
    desc: "Phát triển các website portfolio và landing page.",
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

    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed text-justify">
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
    <Display title="Kỹ năng & công cụ" />

    <div className="grid grid-cols-4 gap-2">
      {skills.map((skill) => (
        <div
          key={skill}
          className="py-2 px-1 text-center text-[10px] border rounded text-neutral-500"
        >
          {skill}
        </div>
      ))}
    </div>

    <HR />

    <p className="text-xs text-neutral-500 font-mono">
      Next.js · TypeScript · Three.js
    </p>
  </div>
);

const EducationContent = () => (
  <div>
    <Tag>Đào tạo</Tag>
    <Display title="Học vấn & nền tảng" />

    {education.map((item, i) => (
      <div key={i} className="p-4 border rounded-lg mb-3">
        <p className="text-sm font-medium mb-2">{item.school}</p>

        <div className="text-[11px] text-neutral-400 font-mono flex gap-3">
          <span>{item.major}</span>
          <span>{item.year}</span>
        </div>
      </div>
    ))}
  </div>
);

const ExperienceContent = () => (
  <div>
    <Tag>Kinh nghiệm</Tag>
    <Display title="Kinh nghiệm làm việc" />

    {experience.map((item, i) => (
      <div key={i} className="p-4 border rounded-lg mb-3">
        <p className="text-sm font-medium">{item.company}</p>

        <div className="text-[11px] text-neutral-400 font-mono flex gap-3 mb-2">
          <span>{item.role}</span>
          <span>{item.year}</span>
        </div>

        <p className="text-xs text-neutral-500">{item.desc}</p>
      </div>
    ))}
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
