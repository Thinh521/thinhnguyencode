import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import Macbook from "../../components/Macbook/Macbook";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";

const Home = () => {
  return (
    <article>
      <Header
        title="Nguyễn Phúc Thịnh"
        subtitle="Mobile App Developer • Freelancer"
        verified={true}
      />

      <section className="mb-5">
        <h1 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500  rounded-full"></span>
          Giới thiệu
        </h1>
        <p className="text-sm text-justify leading-relaxed">
          Xin chào, tớ là Nguyễn Phúc Thịnh. Hiện tại tớ đang là sinh viên
          chuyên ngành Thiết Kế Trang Web tại Trường Cao Đẳng Công Nghệ Thông
          Tin TP.HCM (ITC). Với niềm đam mê sâu sắc với lập trình và sáng tạo
          giao diện, tớ không ngừng học hỏi và phát triển kỹ năng mỗi ngày. Tớ
          còn tự học thêm về Editor và thiết kế nữa. Hiện tại, tớ đang từng bước
          chinh phục hành trình để trở thành một Mobile App Developer chuyên
          nghiệp, thực hiện những ước mơ lớn và đóng góp giá trị cho các dự án
          công nghệ trong tương lai.
        </p>
      </section>

      <Divider />

      <div className="my-10">
        <Macbook />
      </div>

      <Divider />

      {/* <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" /> */}

      <section className="my-6">
        <h1 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full"></span>
          Kết nối với tớ
        </h1>
        <div className="flex flex-col gap-6">
          <Button className="w-[40%]" to="/cv">
            Resume
          </Button>
          <SocialLinks />
        </div>
      </section>

      <Divider />
    </article>
  );
};

export default Home;
