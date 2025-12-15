import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import Macbook from "../../components/Macbook/Macbook";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SliderCarousel from "../../components/Carousel/SliderCarousel";

const Home = () => {
  return (
    <article>
      <Header
        title="Nguyễn Phúc Thịnh"
        subtitle="Mobile App Developer • Freelancer"
        verified={true}
      />

      <section>
        <SectionTitle className="mb-2">Giới thiệu</SectionTitle>
        <p className="text-sm text-justify leading-relaxed">
          Xin chào, mình là Nguyễn Phúc Thịnh, sinh viên chuyên ngành Thiết Kế
          Trang Web tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC). Với
          niềm đam mê sâu sắc dành cho lập trình và sáng tạo giao diện người
          dùng (UI/UX), mình không ngừng học hỏi và phát triển kỹ năng mỗi ngày.
          Lập trình là nền tảng, nhưng mình còn có sở thích đặc biệt với thiết
          kế, chụp ảnh và quay dựng (Video Editing). Chính những sở thích này đã
          thúc đẩy mình tự trau dồi thêm các kỹ năng về thiết kế đồ họa và biên
          tập nội dung, tạo nên một lợi thế toàn diện. Hiện tại, mình đang từng
          bước chinh phục mục tiêu trở thành một Frontend Developer chuyên
          nghiệp. Mình tin rằng sự kết hợp giữa kiến thức chuyên ngành và các kỹ
          năng sáng tạo sẽ giúp mình thực hiện những dự án lớn, đóng góp giá trị
          thiết thực vào ngành công nghệ trong tương lai.
        </p>
      </section>

      <Divider className="mt-6" />

      <section className="flex justify-center items-center w-full h-full">
        <Macbook />
      </section>

      <Divider className="w-full lg:w-[70%] mb-10" />

      <section className="flex justify-center items-center w-full h-full">
        <SliderCarousel
          baseWidth={300}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </section>

      <Divider className="my-10" />

      <section>
        <SectionTitle className="mb-4">Kết nối</SectionTitle>
        <div className="flex flex-col gap-6">
          <Button className="w-[150px]" to="/cv">
            Resume
          </Button>
          <SocialLinks />
        </div>
      </section>

      <Divider className="my-10" />
    </article>
  );
};

export default Home;
