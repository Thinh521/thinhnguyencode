import { useState } from "react";
import { VerifiedIcon } from "../../components/Icons/Icons";
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { IMAGES } from "../../../public/images/imgaes";

const interestingFacts = [
  { icon: "💻", text: "Đam mê lập trình & thiết kế UI/UX" },
  { icon: "📸", text: "Yêu thích nhiếp ảnh & quay phim" },
  { icon: "🎓", text: "Sinh viên Thiết Kế Trang Web tại ITC" },
  { icon: "🏙️", text: "Sống và làm việc tại TP.HCM" },
];

const About = () => {
  const [imgLoaded, setImgLoaded] = useState(
    localStorage.getItem("avatarLoaded") === "true"
  );

  const handleImageLoad = () => {
    setImgLoaded(true);
    localStorage.setItem("avatarLoaded", "true");
  };

  return (
    <article>
      <Header
        title="Giới thiệu"
        subtitle="Một chút thú vị về mình và những điều lớn lao"
      />

      <section className="flex justify-center">
        <div className="text-center my-2">
          <div className="relative w-44 h-44 mx-auto mb-4">
            {/* Skeleton */}
            {!imgLoaded && (
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-neutral-700 animate-pulse" />
            )}

            <img
              src={IMAGES.avatar}
              alt="avatar"
              className={`w-full h-full rounded-full object-cover border border-gray-200 dark:border-neutral-700/50 absolute inset-0 transition-opacity duration-500 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
            />

            <span
              className="absolute bottom-2 right-6 block w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"
              title="Đang hoạt động"
            ></span>
          </div>

          <div className="flex justify-center items-center gap-1.5 mb-2">
            <h1 className="font-playfair text-xl font-bold text-black dark:text-white">
              Nguyễn Phúc Thịnh
            </h1>
            <VerifiedIcon />
          </div>
          <p className="text-sm mb-5">Mobile App Developer • Freelancer</p>
        </div>
      </section>

      <section>
        <Divider />
      </section>

      <section className="my-6">
        <SectionTitle className="mb-4">Kết nối</SectionTitle>
        <div className="flex flex-col gap-6">
          <Button className="w-[150px]" to="/cv">
            Resume
          </Button>
          <SocialLinks />
        </div>
      </section>

      <section className="mb-5">
        <Divider />
      </section>

      <section>
        <SectionTitle className="mb-2">Câu chuyện</SectionTitle>
        <p className="text-sm text-justify leading-relaxed">
          Xin chào, mình xin phép được chia sẻ nhiều hơn về hành trình của mình.
          Hiện tại, mình đang là sinh viên năm cuối chuyên ngành Thiết Kế Trang
          Web tại Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC). Hiện tại
          mình đang sinh sống và làm việc tại TP.HCM. Đây là giai đoạn mình đang
          dồn hết tâm huyết của mình cho các dự án tốt nghiệp, mà Website cá
          nhân này chính là một trong những dự án tâm đắc nhất của mình. Mục
          tiêu của website này là một không gian toàn diện hiện đại, thân thiện
          và đẹp mắt để: giới thiệu bản thân, trưng bày các dự án đã thực hiện,
          chia sẻ học vấn, và đặc biệt là nơi lưu giữ những hình ảnh, âm nhạc,
          những câu chuyện, thành tựu cá nhân mình đã trải qua và có được trong
          hành trình của mình. Mình có niềm yêu thích đặc biệt với lập trình
          giao diện (Frontend) và đang không ngừng tự học thêm các ngôn ngữ lập
          trình chuyên sâu hơn để có thể xây dựng những ứng dụng (App), website
          hoàn chỉnh, hiện đại và độc đáo. Cùng với khát vọng trở thành một
          Frontend Developer chuyên nghiệp trong tương lai. Bên cạnh kiến thức
          lập trình. Nhà trường cũng đã trang bị thêm kiến thức nền tảng cho
          mình về thiết kế và sáng tạo. Mình cũng học được các kỹ năng đủ để
          thiết kế được các Poster. Tuy nhiên, Mình không ngừng tự thử thách bản
          thân. Mình đang trên hành trình học hỏi không ngừng để hoàn thiện sâu
          hơn nữa kỹ năng chuyên môn và tư duy thiết kế, nhằm tạo ra những sản
          phẩm không chỉ đẹp mà còn mang tính ứng dụng cao và đột phá. Ngoài ra,
          mình cực kỳ đam mê quay phim và chụp ảnh. Sở thích này không chỉ là
          giải trí mà còn là cách mình lưu giữ trọn vẹn những khoảnh khắc đáng
          nhớ nhất của bản thân, gia đình, bạn bè và người yêu của mình. Mình
          muốn dùng "góc kính nhiệm màu" của mình để truyền tải đến mọi người
          những gì mình thấy là đẹp đẽ, đáng yêu và ý nghĩa nhất trong cuộc sống
          của mình.
        </p>
      </section>

      <section className="my-5">
        <Divider />
      </section>

      <section className="mb-5">
        <SectionTitle className="mb-2">Những điều thú vị</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interestingFacts.map((fact, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-lg"
            >
              <span className="text-xl">{fact.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {fact.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Divider />
    </article>
  );
};

export default About;
