import { ExternalLink } from "lucide-react";
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
        title="Học vấn & Kĩ năng"
        subtitle="Quá trình học tập và các kĩ năng của mình"
      />

      <section className="flex flex-col items-center justify-center text-center mb-10">
        <h1 className="font-playfair font-bold text-xl dark:text-white text-black uppercase mb-2">
          TRƯỜNG CAO ĐẲNG CÔNG NGHỆ THÔNG TIN TP. HỒ CHÍ MINH
        </h1>

        <p className="text-base font-semibold uppercase text-gray-700 dark:text-gray-300 mb-6">
          Information Technology College HCM City
        </p>

        <a
          href="https://itc.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-4 rounded-full"
        >
          <img
            src={IMAGES.logoSchool}
            alt="ITC Logo"
            className="w-32 h-32 object-contain border border-gray-200 dark:border-neutral-700/50 rounded-full mx-auto"
          />
        </a>
      </section>

      <section>
        <SectionTitle className="mb-2">Tổng quan</SectionTitle>
        <p className=" mb-6 text-sm text-justify leading-relaxed">
          Trải qua 24 năm đào tạo, đã có hơn 23 khóa sinh viên tốt nghiệp ra
          trường. Hiện nay, trường Cao đẳng Công nghệ thông tin TP.HCM (ITC)
          đang đào tạo 18 ngành, nghề cao đẳng và 7 ngành, nghề trung cấp bao
          gồm nhiều lĩnh vực như sau: Công nghệ thông tin; Thiết kế đồ họa;
          Truyền thông và mạng máy tính; Hệ thống thông tin; Thương mại điện tử;
          Lập trình máy tính; Công nghệ kỹ thuật điện tử, truyền thông; Công
          nghệ kỹ thuật điều khiển và tự động hóa; Quản trị kinh doanh (Quản trị
          Digital Marketing); Kỹ thuật sửa chữa, lắp ráp máy tính; Kế toán, Tài
          chính - Ngân hàng, Logistics,… Hàng năm, số lượng cử nhân, kỹ sư tốt
          nghiệp ra trường có việc làm đạt tỷ lệ lên đến 95%.
        </p>
      </section>

      <section className="my-8">
        <Divider />
      </section>

      <section>
        <SectionTitle className="mb-4">Thông tin học tập</SectionTitle>
        <ul className="space-y-4">
          {studyInfo.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="mt-2 flex-shrink-0 w-2 h-2 rotate-45 bg-gray-400 dark:bg-gray-500 rounded-sm" />
              <span className="text-sm">
                {item.label}:{" "}
                <strong className="text-black dark:text-white font-bold">
                  {item.value}
                </strong>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <Divider />
      </section>

      <section>
        <SectionTitle className="mb-4">Kỹ năng</SectionTitle>
        <SkillCarousel />
      </section>

      <Divider />
    </article>
  );
};

export default Education;
