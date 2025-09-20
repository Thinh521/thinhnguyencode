import Header from "../../components/Header/Header";

const Education = () => {
  return (
    <>
      <article>
        <Header
          title="Học vấn & Đào tạo"
          subtitle="Quá trình học tập và các chứng chỉ đã đạt được"
        />

        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="font-playfair font-semibold text-2xl dark:text-white mb-2">
              TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN TP. HỒ CHÍ MINH
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Information Technology College HoChiMinh City
            </p>
            <img
              src="/thinhnguyencode/images/logo_school.png"
              alt="ITC Logo"
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Tổng quan
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Hiện tại tôi là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
              tại{" "}
              <a
                href="https://itc.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-justify"
              >
                Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC)
              </a>
              . Với kiến thức chuyên môn về lập trình full-stack và thiết kế
              giao diện, tôi đang không ngừng nâng cao kỹ năng để sẵn sàng cho
              môi trường làm việc chuyên nghiệp.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 dark:text-white border-b border-dashed border-gray-400 dark:border-neutral-400 pb-2">
                  Thông tin học tập
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Thời gian: </strong>2023 - 2025
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Chuyên ngành: </strong>Thiết Kế Trang Web
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Loại hình đào tạo: </strong>Chính quy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Bằng cấp: </strong>Cử nhân Cao đẳng (dự kiến
                      7/2025)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Tình trạng: </strong>Đang theo học
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Điểm trung bình (GPA) hiện tại: </strong>3.34 /
                      4.0
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3 dark:text-white border-b border-dashed border-gray-400 dark:border-neutral-400 pb-2">
                  Liên kết
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <a
                      href="https://itc.edu.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Trang chủ trường ITC
                    </a>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <a
                      href="https://itc.edu.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Chương trình đào tạo
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4 dark:text-white border-b  border-dashed pb-2">
              Kỹ năng đã học
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 dark:text-white">
                  Front-End Development
                </h3>
                <ul className="space-y-2">
                  {[
                    "HTML5 & CSS3",
                    "JavaScript (ES6+)",
                    "React.js",
                    "Bootstrap",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 dark:text-white">
                  Back-End & Database
                </h3>
                <ul className="space-y-2">
                  {["Node.js", "Express.js", "MongoDB", "MySQL"].map(
                    (skill) => (
                      <li key={skill} className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {skill}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 dark:text-white">
                  Công cụ & Khác
                </h3>
                <ul className="space-y-2">
                  {[
                    "Git & GitHub",
                    "Postman",
                    "Figma",
                    "VS Code",
                    "Responsive Design",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div>
                <h3 className="font-semibold text-lg mb-3 dark:text-white">
                  Kiến thức bổ trợ
                </h3>
                <ul className="space-y-2">
                  {[
                    "UI/UX Design",
                    "SEO cơ bản",
                    "Agile Methodology",
                    "RESTful APIs",
                    "Authentication",
                  ].map((skill) => (
                    <li key={skill} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white border-b border-dashed border-gray-400 dark:border-neutral-400 pb-2">
            Chứng chỉ & Khóa học
          </h2>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 dark:text-white">
              Chứng chỉ Tin học
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Đạt loại Giỏi - 2023
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Chứng chỉ tin học văn phòng nâng cao với các kỹ năng Word, Excel,
              PowerPoint.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 dark:text-white">
              Khóa học trực tuyến
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium dark:text-white">
                  The Complete Web Developer in 2024: Zero to Mastery
                </p>
                <p className="text-gray-600 dark:text-gray-300">Udemy - 2024</p>
              </li>
              <li>
                <p className="font-medium dark:text-white">
                  React - The Complete Guide
                </p>
                <p className="text-gray-600 dark:text-gray-300">Udemy - 2023</p>
              </li>
              <li>
                <p className="font-medium dark:text-white">
                  JavaScript Algorithms and Data Structures
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  freeCodeCamp - 2023
                </p>
              </li>
            </ul>
          </div>
        </section> */}
      </article>
    </>
  );
};

export default Education;
