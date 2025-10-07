import { IMAGES } from "../../../public/images/imgaes";
import SkillCarousel from "../../components/Carousel/SkillCarousel";
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const studyInfo = [
  { label: "Họ và tên", value: "Nguyễn Phúc Thịnh" },
  { label: "Chuyên ngành", value: "Thiết Kế Trang Web" },
  { label: "Loại hình đào tạo", value: "Chính quy" },
  { label: "Bằng cấp", value: "Cử nhân Cao đẳng" },
  { label: "Tình trạng", value: "Chuẩn bị tốt nghiệp (đang chờ xét)" },
  { label: "Điểm trung bình (GPA)", value: "3.35 / 4.0" },
  { label: "Tốt nghiệp loại", value: "Giỏi" },
  { label: "Thời gian", value: "2023 - 2025" },
];

const Education = () => {
  return (
    <article>
      <Header
        title="Học vấn & Đào tạo"
        subtitle="Quá trình học tập và các kĩ năng của mình"
      />

      <section className="mb-8">
        <div className="text-center mb-10">
          <h1 className="font-playfair font-semibold text-xl dark:text-white mb-2 uppercase">
            TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN TP. HỒ CHÍ MINH
          </h1>
          <p className="mb-6 mx-4 text-base font-semibold uppercase">
            Information Technology College HCM City
          </p>
          <a
            href="https://itc.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={IMAGES.logoSchool}
              alt="ITC Logo"
              className="w-32 h-32 mx-auto object-contain border border-gray-200 dark:border-neutral-700/50 rounded-full"
            />
          </a>
        </div>

        <div className="mb-8">
          <SectionTitle>Tổng quan</SectionTitle>
          <p className=" mb-6 text-sm text-justify leading-relaxed">
            Trải qua 24 năm đào tạo, đã có hơn 23 khóa sinh viên tốt nghiệp ra
            trường. Hiện nay, trường Cao đẳng Công nghệ thông tin TP.HCM (ITC)
            đang đào tạo 18 ngành, nghề cao đẳng và 7 ngành, nghề trung cấp bao
            gồm nhiều lĩnh vực như sau: Công nghệ thông tin; Thiết kế đồ họa;
            Truyền thông và mạng máy tính; Hệ thống thông tin; Thương mại điện
            tử; Lập trình máy tính; Công nghệ kỹ thuật điện tử, truyền thông;
            Công nghệ kỹ thuật điều khiển và tự động hóa; Quản trị kinh doanh
            (Quản trị Digital Marketing); Kỹ thuật sửa chữa, lắp ráp máy tính;
            Kế toán, Tài chính - Ngân hàng, Logistics,… Hàng năm, số lượng cử
            nhân, kỹ sư tốt nghiệp ra trường có việc làm đạt tỷ lệ lên đến 95%.
          </p>

          <div>
            <SectionTitle>Thông tin học tập</SectionTitle>
            <ul className="space-y-4">
              {studyInfo.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400 mr-3 rotate-45 self-center" />
                  <span className="text-sm">
                    <strong className="text-black dark:text-white font-bold">
                      {item.label}:{" "}
                    </strong>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Kỹ năng</SectionTitle>
        <SkillCarousel />
      </section>

      <Divider />
    </article>
  );
};

export default Education;
