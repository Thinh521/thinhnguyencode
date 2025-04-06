import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";

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
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Giới thiệu
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Một chút thú vị về tôi và những điều lớn lao
          </p>
          <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        </header>
        <section className="flex justify-center">
          <div className="text-center">
            <img
              src="/thinhnguyencode/images/avatar_2.jpg"
              alt=""
              className="w-60 h-w-60 mx-auto mb-4 rounded-full"
            />
            <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
              Nguyễn Phúc Thịnh
            </h1>
            <p className="text-gray-800 mb-4 dark:text-white font-medium">
              Website desgin
            </p>
            <div>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition-all transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
                CV của tôi
              </button>
              <div className="mt-3">
                <ul className="flex justify-center space-x-2">
                  {socialLinks.map(({ Icon, link }, index) => (
                    <li key={index}>
                      <Link
                        href={link}
                        className="block p-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <div className="w-6 h-6">
                          <Icon />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        <section>
          <p className="text-gray-800 dark:text-white text-justify ">
            Tớ xin phép được giới thiệu nhiều hơn về bản thân nhé. Tớ hiện đang
            sống và làm việc tại TP.HCM. Lí do tớ chọn ngành này là vì lúc trước
            tớ rất thích việc code và thiết kế luôn. Nên không tránh khỏi việc
            phân vân lựa chọn 1 trong 2. Khi tớ tìm hiểu kĩ các ngày thì đây là
            ngành vừa tích hợp được 2 thứ luôn ấy. Hiện tại tớ đang là sinh viên
            năm cuối của trường nên tớ thực hiện. Và đây website này cũng là
            những dự án mà tớ tâm huyết nhất. Nếu nó có gì sai sót mọi ngưới
            thông cảm cho tớ nhé. Ngoài ra, tớ siêu thích quay phim, chụp ảnh và
            chụp linh tinh luôn í. kiểu như tớ muốn lưu lại những khoản khắc
            đáng nhớ, đẹp nhất của tớ cùng với gia đình, bạn bè và bản thân. tớ
            muốn truyền tải với mọi nguòi những gì tớ thấy và những thứ đẹp nhất
            đang yêu nhất qua góc kính nhiệm màu nhiệm màu của tớ.
          </p>
        </section>
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        <footer className="text-gray-800 mb-36 dark:text-white space-y-1 mt-4">
          <p>Dùng máy tính để có trải nghiệm tốt nhất nhé</p>
          <p>Nguyễn Phúc Thịnh</p>
          <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
        </footer>
      </article>
    </>
  );
};

export default About;
