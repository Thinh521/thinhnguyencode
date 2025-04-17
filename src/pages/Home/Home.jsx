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

const socialLinks = [
  { Icon: FacebookIcon, link: "https://www.facebook.com/share/1L94WW4Qsx/" },
  { Icon: InstagramIcon, link: "https://www.instagram.com/ph.thinh_ig" },
  { Icon: TiktokIcon, link: "https://www.tiktok.com/@pthjnh_25" },
  { Icon: GithubIcon, link: "https://github.com/Thinh521" },
];

const Home = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nguyễn Phúc Thịnh
          </h1>
          <p className="text-base">Front-End Developer / Freelance</p>
          <Border />
        </header>
        <section>
          <p className="text-base text-justify">
            Xin chào, tớ là Nguyễn Phúc Thịnh. Hiện tại tớ đang là sinh viên
            chuyên ngành Thiết Kế Trang Web tại Trường Cao Đẳng Công Nghệ Thông
            Tin TP.HCM (ITC). Với niềm đam mê sâu sắc với lập trình và sáng tạo
            giao diện, tớ không ngừng học hỏi và phát triển kỹ năng mỗi ngày. Tớ
            còn tự học thêm về Editor và thiết kế nữa. Hiện tại, tớ đang từng
            bước chinh phục hành trình và trở thành một Fullstack Developer
            chuyên nghiệp, thực hiện những ước mơ to lớn và đóng góp giá trị cho
            các dự án công nghệ trong tương lai.
          </p>
        </section>
        <Border />
        <Hero />
        <div className="flex mb-6">
          <Link
            to="/cv"
            state={{ from: "home" }}
            className="border max-w-max border-neutral-400 hover:border-gray-800 hover:text-gray-800 dark:hover:text-neutral-200 dark:hover:border-neutral-200 block px-4 py-2 text-base text-gray-600 dark:text-neutral-400 font-medium rounded-lg transition-colors duration-200"
          >
            CV
          </Link>
          <div className="border-r border-gray-400 w-1 h-10 mx-4"></div>
          <div className="">
            <ul className="flex space-x-2">
              {socialLinks.map(({ Icon, link }, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 border border-neutral-400 hover:border-gray-800 dark:hover:border-neutral-200 text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200 rounded-lg"
                  >
                    <div className="w-6 h-6">
                      <Icon />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default Home;
