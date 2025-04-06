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
          <h1 className="font-playfair text-2xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nguyễn Phúc Thịnh
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Web desgin
          </p>
          <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        </header>
        <section>
          <p className="text-base text-gray-600 font-normal dark:text-white text-justify ">
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
        <Hero />
        <div className="flex mt-8">
          <a
            href=""
            className="border mr-1 border-gray-300 block px-4 py-2 text-base text-gray-600 font-medium rounded-lg "
          >
            Resume
          </a>
          <div className="">
            <ul className="flex space-x-1">
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
        </div>
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default Home;
