import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const SOCIAL_LINKS = [
  {
    Icon: FacebookIcon,
    link: "https://www.facebook.com/share/1L94WW4Qsx/",
    label: "Facebook",
    color:
      "hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-400",
  },
  {
    Icon: InstagramIcon,
    link: "https://www.instagram.com/ph.thinh_ig",
    label: "Instagram",
    color:
      "hover:bg-pink-50 hover:border-pink-400 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:border-pink-400",
  },
  {
    Icon: TiktokIcon,
    link: "https://www.tiktok.com/@pthjnh_25",
    label: "TikTok",
    color:
      "hover:bg-slate-50 hover:border-slate-700 hover:text-slate-800 dark:hover:bg-slate-800/20 dark:hover:border-slate-400",
  },
  {
    Icon: GithubIcon,
    link: "https://github.com/Thinh521",
    label: "GitHub",
    color:
      "hover:bg-gray-50 hover:border-gray-700 hover:text-gray-800 dark:hover:bg-gray-800/20 dark:hover:border-gray-400",
  },
];

const Home = () => {
  return (
    <article className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-4">
        <h1 className="font-playfair text-4xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
          Nguyễn Phúc Thịnh
        </h1>
        <p className="text-sm text-left">Mobile App Developer • Freelancer</p>
        <Border />
      </header>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
          Giới thiệu
        </h2>
        <p className="text-sm text-justify leading-relaxed">
          Xin chào, tớ là Nguyễn Phúc Thịnh. Hiện tại tớ đang là sinh viên
          chuyên ngành Thiết Kế Trang Web tại Trường Cao Đẳng Công Nghệ Thông
          Tin TP.HCM (ITC). Với niềm đam mê sâu sắc với lập trình và sáng tạo
          giao diện, tớ không ngừng học hỏi và phát triển kỹ năng mỗi ngày. Tớ
          còn tự học thêm về Editor và thiết kế nữa. Hiện tại, tớ đang từng bước
          chinh phục hành trình để trở thành một Mobile App Developer chuyên
          nghiệp, thực hiện những ước mơ lớn và đóng góp giá trị cho các dự án
          công nghệ trong tương lai.
        </p>
      </section>

      <Border />

      <section>
        <Hero />
      </section>

      <section className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <Link
            to="/cv"
            state={{ from: "home" }}
            className="group relative inline-flex items-center gap-2 
                 bg-gradient-to-r from-gray-800 to-gray-700 
                 hover:from-gray-700 hover:to-gray-600
                 dark:from-gray-100 dark:to-gray-200
                 dark:hover:from-white dark:hover:to-gray-100
                 text-white dark:text-gray-800 
                 px-6 py-2.5 rounded-xl font-medium
                 transition-all duration-300 ease-in-out
                 transform hover:scale-105 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Xem CV của tôi"
          >
            <span>Xem CV</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>
          <div className="sm:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

          {/* Mạng xã hội */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
              Kết nối với tôi
            </h3>
            <ul className="flex flex-wrap gap-3" role="list">
              {SOCIAL_LINKS.map(({ Icon, link, label, color }, index) => (
                <li key={`${label}-${index}`}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    className={`group relative block p-2.5 border border-neutral-300 dark:border-neutral-600 
                         text-gray-600 dark:text-neutral-400 
                         transition-all duration-300 ease-in-out
                         rounded-xl shadow-sm hover:shadow-md
                         transform hover:scale-105 hover:-translate-y-0.5
                         ${color}`}
                  >
                    <div className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                      <Icon />
                    </div>
                    {/* Tooltip */}
                    <span
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                             bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                             text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 
                             transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                    >
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Border />

      <Footer />
    </article>
  );
};

export default Home;
