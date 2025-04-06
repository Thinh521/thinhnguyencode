import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";
import Footer from "../../components/Footer/Footer";

const socialLinks = [
  { Icon: FacebookIcon, link: "https://facebook.com" },
  { Icon: InstagramIcon, link: "https://instagram.com" },
  { Icon: TiktokIcon, link: "https://tiktok.com" },
  { Icon: GithubIcon, link: "https://github.com" },
];

const About = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Giới thiệu
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-lg font-normal">
            Một chút thú vị về tôi và những điều lớn lao
          </p>
          <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-auto my-4"></div>
        </header>
        <section className="flex justify-center">
          <div className="text-center my-4">
            <img
              src="/thinhnguyencode/images/avatar_2.jpg"
              alt=""
              className="w-48 h-w-48 mx-auto mb-4 rounded-full"
            />
            <h1 className="font-playfair text-4xl font-bold mb-3 text-gray-800 dark:text-white">
              Nguyễn Phúc Thịnh
            </h1>
            <p className="text-gray-600 dark:text-neutral-400 text-lg font-normal mb-5">
              Website desgin
            </p>
            <div className="flex justify-center items-center">
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
          </div>
        </section>
        <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-auto my-4"></div>
        <section>
          <p className="text-base text-gray-600 font-normal dark:text-neutral-400 text-justify">
            Tôi xin phép được giới thiệu nhiều hơn về bản thân nhé. tôi hiện
            đang sống và làm việc tại TP.HCM. Lí do tôi chọn ngành này là vì lúc
            trước tôi rất thích việc code và thiết kế luôn. Nên không tránh khỏi
            việc phân vân lựa chọn 1 trong 2. Khi tôi tìm hiểu kĩ các ngày thì
            đây là ngành vừa tích hợp được 2 thứ luôn ấy. Hiện tại tôi đang là
            sinh viên năm cuối của trường nên tôi thực hiện. Và đây website này
            cũng là những dự án mà tôi tâm huyết nhất. Nếu nó có gì sai sót mọi
            ngưới thông cảm cho tôi nhé. Ngoài ra, tôi siêu thích quay phim,
            chụp ảnh và chụp linh tinh luôn í. kiểu như tôi muốn lưu lại những
            khoản khắc đáng nhớ, đẹp nhất của tôi cùng với gia đình, bạn bè và
            bản thân. tôi muốn truyền tải với mọi nguòi những gì tôi thấy và
            những thứ đẹp nhất đang yêu nhất qua góc kính nhiệm màu nhiệm màu
            của tôi.
          </p>
        </section>
        <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default About;
