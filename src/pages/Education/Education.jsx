import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import OrbitCarousel from "../../components/SkillCarousel/orbit-carousel";

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
            <SectionTitle>Tổng quan</SectionTitle>
            <p className=" mb-6 text-sm text-justify leading-relaxed">
              Hiện tại tôi là sinh viên năm cuối chuyên ngành Thiết Kế Trang Web
              tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC) . Với kiến
              thức chuyên môn về lập trình full-stack và thiết kế giao diện, tôi
              đang không ngừng nâng cao kỹ năng để sẵn sàng cho môi trường làm
              việc chuyên nghiệp.
            </p>

            <div>
              <SectionTitle>Thông tin học tập</SectionTitle>
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
                    <strong>Bằng cấp: </strong>Cử nhân Cao đẳng (dự kiến 7/2025)
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
                    <strong>Điểm trung bình (GPA) hiện tại: </strong>3.34 / 4.0
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>Kỹ năng</SectionTitle>
          <OrbitCarousel />
        </section>
      </article>
    </>
  );
};

export default Education;
