import React from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";

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
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nguyễn Phúc Thịnh
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Web desgin
          </p>
          <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        </header>
        <section>
          <p className="text-gray-800 dark:text-white text-justify ">
            Xin chào, tớ là Nguyễn Phúc Thịnh. Hiện tại tớ đang là sinh viên
            chuyên ngành Thiết kế trang Web tại Trường Cao đẳng Công nghệ Thông
            tin TP.HCM (ITC). Với niềm đam mê sâu sắc với lập trình và sáng tạo
            giao diện, tớ không ngừng học hỏi và phát triển kỹ năng mỗi ngày.
            Hiện tại, tớ đang từng bước chinh phục hành trình trở thành một
            Fullstack Developer chuyên nghiệp, sẵn sàng hiện thực hóa những ước
            mơ lớn và đóng góp giá trị thực sự cho các dự án công nghệ trong
            tương lai.
          </p>
        </section>
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        <button className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition-all transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
          CV của tôi
        </button>
        <div className="mt-3">
          <ul className="flex space-x-2">
            {socialLinks.map(({ Icon, link }, index) => (
              <li key={index}>
                <a
                  href={link}
                  className="block p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <div className="w-6 h-6">
                    <Icon />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className="text-gray-800 dark:text-white space-y-1 mt-4">
          <p>Dùng máy tính để có trải nghiệm tốt nhất nhé</p>
          <p>Nguyễn Phúc Thịnh</p>
          <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
        </footer>
      </article>
    </>
  );
};

export default Home;
