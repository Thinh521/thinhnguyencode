import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import { ScrollTimeline } from "../../components/scroll-timeline";

const DEFAULT_EVENTS = [
  {
    year: "2023",
    title: "Bắt đầu học tập",
    subtitle: "Cao đẳng Công Nghệ Thông Tin TP.HCM",
    description:
      "Chính thức nhập học, bắt đầu chương trình với chuyên ngành Thiết Kế Trang Web tại trường.",
  },
  {
    year: "2024",
    title: "Tiếp tục học tập",
    subtitle: "Cao đẳng Công Nghệ Thông Tin TP.HCM",
    description:
      "Hoàn thành các môn chuyên ngành, rèn luyện kỹ năng lập trình và phát triển phần mềm.",
  },
  {
    year: "03/2025",
    title: "Thực tập & Tốt nghiệp",
    subtitle: "Công ty CP Pione Group",
    description:
      "Bắt đầu thực tập từ tháng 3/2025 tại Pione Group, mình chuyển hướng sang phát triển ứng dụng di động với React Native, đồng thời tiếp cận thêm kiến thức về Smart Contract và Blockchain để mở rộng nền tảng công nghệ của bản thân.",
  },
  {
    year: "06/2025",
    title: "Thực tập & Tham gia cuộc thi",
    subtitle: "Pione Dream Hackathon AI & BLOCKCHAIN 2025",
    description:
      "Ứng dụng công nghệ Blockchain trong các mảng chiến lược như: tài sản số, tiền số – tiền mã hoá, hạ tầng mạng Blockchain và hệ thống truy xuất nguồn gốc. Song song đó, ứng dụng Trí tuệ nhân tạo (AI) vào các sản phẩm chiến lược như Trợ lý ảo và AI phân tích dữ liệu, góp phần mang đến giải pháp công nghệ hiện đại và thực tiễn.",
  },
];

const Timeline = () => {
  return (
    <>
      <article>
        <Header
          title="Hành trình"
          subtitle="Những dấu mốc và trải nghiệm trên hành trình của mình"
        />

        <ScrollTimeline
          events={DEFAULT_EVENTS}
          title="Nhìn lại và bước tiếp"
          subtitle="Mỗi bước đi là một bài học, mỗi trải nghiệm là một hành trang quý giá"
          progressIndicator={true}
          cardAlignment="alternating"
          revealAnimation="fade"
        />

        <Divider />
      </article>
    </>
  );
};

export default Timeline;
