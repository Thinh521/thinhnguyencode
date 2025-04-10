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

const socialLinks = [
  { Icon: FacebookIcon, link: "https://facebook.com" },
  { Icon: InstagramIcon, link: "https://instagram.com" },
  { Icon: TiktokIcon, link: "https://tiktok.com" },
  { Icon: GithubIcon, link: "https://github.com" },
];

const About = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <article>
          <header>
            <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
              Giới thiệu
            </h1>
            <p className="text-base">
              Một chút thú vị về tớ và những điều lớn lao
            </p>
            <Border />
          </header>
          <section className="flex justify-center">
            <div className="text-center my-2">
              <img
                src="/thinhnguyencode/images/avatar_2.jpg"
                alt=""
                className="w-48 h-w-48 mx-auto mb-4 rounded-full"
              />
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
                Nguyễn Phúc Thịnh
              </h1>
              <p className="text-lg mb-5">Front-End / Freelance</p>
              <div className="flex justify-center items-center">
                <Link
                  to="/cv"
                  state={{ from: "about" }}
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
            </div>
          </section>
          <Border />
          <section>
            <p className="text-base text-justify">
              Tớ xin phép được giới thiệu nhiều hơn về bản thân nhé. Tớ hiện
              đang sống và làm việc tại TP.HCM. Tớ đang là sinh viên năm cuối
              của trường nên tớ thực hiện và làm những dự án để tốt nghiệp.
              Website này cũng là những dự án mà tớ tâm huyết nhất. Mục đích của
              nó dùng để giới thiệu bản thân của tớ, giới thiệu về các dự án và
              xem dự án. Học vấn của tớ. Cùng với đó là những hình ảnh âm nhạc
              và những câu chuyện của tớ đã trải qua và những thứ tớ đạt được
              trong cuộc sống. Tớ rất thích với việc lập trình giao diện và tớ
              cũng đang tự học thêm nhiều ngôn ngữ lập trình để làm được những
              website hoàn chỉnh và hiện đại, độc đáo hơn. Tớ muốn và hướng đên
              việc trở thành một Fullstack Developer chuyên nghiệp. Ngoài ra, tớ
              siêu thích quay phim, chụp ảnh luôn í. Kiểu như tớ muốn lưu lại
              những khoảnh khắc đáng nhớ, đẹp nhất, dễ thương nhất của tớ cùng
              với gia đình, người iu, bạn bè và bản thân tớ. Tớ muốn truyền tải
              với mọi nguòi những gì mà tớ thấy và những thứ đẹp nhất đáng yêu
              nhất qua góc kính nhiệm màu nhiệm màu của tớ.
            </p>
          </section>
          <Border />
          <Footer />
        </article>
      </motion.div>
    </>
  );
};

export default About;
