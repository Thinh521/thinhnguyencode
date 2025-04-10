import React from "react";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const Education = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Học vấn
          </h1>
          <p className="text-base">Trình độ học vấn của tớ</p>
          <Border />
        </header>
        <section>
          <div className="text-center grid gap-y-2">
            <h1 className="font-playfair font-semibold text-xl dark:text-white">
              TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN TP. HỒ CHÍ MINH
            </h1>
            <p className="mb-2 dark:text-white">
              Information Technology College HoChiMinh City
            </p>
            <img
              src="/thinhnguyencode/images/logo_school.png"
              alt=""
              className="w-28 h-28 mx-auto"
            />
          </div>
          <p className="my-10 text-justify">
            Hiện tại tớ là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
            tại{" "}
            <a
              href="https://itc.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)
            </a>
            . Với kiến thức chuyên môn về front-end development, UI/UX design và
            các framework hiện đại, tớ mong muốn ứng dụng những kỹ năng đã học
            vào thực tế công việc.
          </p>
          <div class="education grid gap-y-2 mb-2">
            <h1>HỌC VẤN</h1>
            <p>
              <strong>Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)</strong>
              <br />
              <em>2023 - 2025 | Chuyên ngành: Thiết Kế Trang Web</em>
              <br />
            </p>
            <ul>
              {/* <li>GPA: 3.6/4.0 </li>
              <li>Đồ án tốt nghiệp:</li> */}
              <li className="group block relative rounded-lg mb-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 transform rotate-45 transition-transform duration-300 "></div>
                <div className="pl-5">
                  <p className="whitespace-nowrap">
                    <strong className="whitespace-nowrap">
                      Front-End: {""}
                    </strong>
                    HTML5, CSS3, JavaScript, Bootstrap, React, Tailwind CSS
                  </p>
                </div>
              </li>
              <li className="group block relative rounded-lg mb-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 transform rotate-45 transition-transform duration-300 "></div>
                <div className="pl-5">
                  <p className="whitespace-nowrap">
                    <strong className="whitespace-nowrap">
                      Back-End: {""}
                    </strong>
                    Nodejs, PHP
                  </p>
                </div>
              </li>
              <li className="group block relative rounded-lg mb-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 transform rotate-45 transition-transform duration-300 "></div>
                <div className="pl-5">
                  <p className="whitespace-nowrap">
                    <strong className="whitespace-nowrap">
                      Database: {""}
                    </strong>
                    MongoDB, SQL
                  </p>
                </div>
              </li>
              <li className="group block relative rounded-lg mb-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 transform rotate-45 transition-transform duration-300 "></div>
                <div className="pl-5">
                  <p className="whitespace-nowrap">
                    <strong className="whitespace-nowrap">Công cụ: {""}</strong>
                    Postman, GitHub
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p>
            Trang chủ:{" "}
            <a
              href="https://itc.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline dark:hover:text-white duration-200"
            >
              Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)
            </a>
          </p>
        </section>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default Education;
