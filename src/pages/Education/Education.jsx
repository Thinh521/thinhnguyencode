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
          <p className="text-gray-800 dark:text-white font-medium">
            Trình độ học vấn của tôi
          </p>
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
          <p className="my-10">
            Hiện tại tôi là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
            tại{" "}
            <a
              href="https://itc.edu.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)
            </a>
            . Với kiến thức chuyên môn về front-end development, UI/UX design và
            các framework hiện đại, tôi mong muốn ứng dụng những kỹ năng đã học
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
              <li>GPA: 3.6/4.0 </li>
              <li>Đồ án tốt nghiệp:</li>
              <li>
                Kỹ năng đạt được: HTML5, CSS3, JavaScript, Bootstrap, React, Tailwind CSS,
                Nodejs, MongoDB, Postman, Figma, UX/UI Design,...
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
