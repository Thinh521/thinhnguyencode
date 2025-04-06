import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

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
          <h1 className="font-playfair text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nguyễn Phúc Thịnh
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-normal">
            Web desgin
          </p>
          <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-auto my-4"></div>
        </header>
        <section>
          <p className="text-base text-gray-600 font-normal dark:text-neutral-400 text-justify">
            Xin chào, tôi là Nguyễn Phúc Thịnh. Hiện tại tôi đang là sinh viên
            chuyên ngành Thiết kế trang Web tại Trường Cao Đẳng Công Nghệ Thông
            Tin TP.HCM (ITC). Với niềm đam mê sâu sắc với lập trình và sáng tạo
            giao diện, tôi không ngừng học hỏi và phát triển kỹ năng mỗi ngày.
            Hiện tại, tôi đang từng bước chinh phục hành trình và trở thành một
            Fullstack Developer chuyên nghiệp, sẵn sàng hiện thực những ước mơ
            to lớn và đóng góp giá trị cho các dự án công nghệ trong tương lai.
          </p>
        </section>
        <div className="border-t border-dashed border-gray-400 dark:border-neutral-400  w-auto my-4"></div>
        <Hero />
        <div className="flex mb-6">
          <a
            href=""
            className="border max-w-max border-neutral-400 hover:border-gray-800 hover:text-gray-800 dark:hover:text-neutral-200 dark:hover:border-neutral-200 block px-4 py-2 text-base text-gray-600 dark:text-neutral-400 font-medium rounded-lg transition-colors duration-200"
          >
            CV của tôi
          </a>
          <div className="border-r border-gray-400 w-1 h-10 mx-4"></div>
          <div className="">
            <ul className="flex space-x-2">
              {socialLinks.map(({ Icon, link }, index) => (
                <li key={index}>
                  <a
                    href={link}
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
        <div className="border-t border-dashed border-gray-300 dark:border-neutral-400  w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default Home;
