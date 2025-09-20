import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";
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

const About = () => {
  return (
    <>
      <article className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-5">
          <h1 className="font-playfair text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
            Giới thiệu
          </h1>
          <p className="text-sm text-left">
            Một chút thú vị về tớ và những điều lớn lao
          </p>
        </header>

        <section className="mb-5">
          <Border />
        </section>

        <section className="flex justify-center">
          <div className="text-center my-2">
            <img
              src="/thinhnguyencode/images/avatar_2.jpg"
              alt=""
              className="w-48 h-w-48 mx-auto mb-4 rounded-full"
            />
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b  from-gray-700 to-gray-500  rounded-full"></div>
              <h1 className="font-playfair text-xl font-bold text-gray-800 dark:text-white">
                Nguyễn Phúc Thịnh
              </h1>
            </div>
            <p className="text-sm mb-5">Mobile App Developer • Freelancer</p>
          </div>
        </section>

        <section className="mb-6">
          <div className="flex flex-col gap-6">
            <Link
              to="/cv"
              state={{ from: "home" }}
              className="group w-max relative inline-flex items-center gap-2 mx-auto
                 bg-gradient-to-r from-gray-800 to-gray-700 
                 hover:from-gray-700 hover:to-gray-600
                 dark:from-gray-100 dark:to-gray-200
                 dark:hover:from-white dark:hover:to-gray-100
                 text-white dark:text-gray-800 
                 px-6 py-2.5 rounded-xl font-medium
                 transition-all duration-300 ease-in-out text-base
                 transform hover:scale-105 hover:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Xem CV của tôi"
            >
              <span className="text-sm">Resume</span>
            </Link>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

            {/* Mạng xã hội */}
            <div className="flex-1">
              <h1 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
                <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500  rounded-full"></span>
                Kết nối với tớ
              </h1>
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

        <section className="mb-5">
          <Border />
        </section>

        <section>
          <h1 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500  rounded-full"></span>
            Câu chuyện của tớ
          </h1>
          <p className="text-sm text-justify">
            Tớ xin phép được giới thiệu nhiều hơn về bản thân nhé. Tớ hiện đang
            sống và làm việc tại TP.HCM. Tớ đang là sinh viên năm cuối của
            trường nên tớ thực hiện và làm những dự án để tốt nghiệp. Website
            này cũng là những dự án mà tớ tâm huyết nhất. Mục đích của nó dùng
            để giới thiệu bản thân của tớ, giới thiệu về các dự án và xem dự án.
            Học vấn của tớ. Cùng với đó là những hình ảnh âm nhạc và những câu
            chuyện của tớ đã trải qua và những thứ tớ đạt được trong cuộc sống.
            Tớ rất thích với việc lập trình giao diện và tớ cũng đang tự học
            thêm nhiều ngôn ngữ lập trình để làm được những website hoàn chỉnh
            và hiện đại, độc đáo hơn. Tớ muốn và hướng đên việc trở thành một
            Fullstack Developer chuyên nghiệp. Ngoài ra, tớ siêu thích quay
            phim, chụp ảnh luôn í. Kiểu như tớ muốn lưu lại những khoảnh khắc
            đáng nhớ, đẹp nhất, dễ thương nhất của tớ cùng với gia đình, người
            iu, bạn bè và bản thân tớ. Tớ muốn truyền tải với mọi nguòi những gì
            mà tớ thấy và những thứ đẹp nhất đáng yêu nhất qua góc kính nhiệm
            màu nhiệm màu của tớ.
          </p>
        </section>

        <section className="my-5">
          <Border />
        </section>

        <div className="mt-4 dark:border-gray-700">
          <h1 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500  rounded-full"></span>
            Những thú vị về tớ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-xl">💻</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Đam mê lập trình & thiết kế UI/UX
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-xl">📸</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Yêu thích nhiếp ảnh & quay phim
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-xl">🎓</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Sinh viên Thiết kế Web tại ITC
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <span className="text-xl">🏙️</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Sống và làm việc tại TP.HCM
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </article>
    </>
  );
};

export default About;
