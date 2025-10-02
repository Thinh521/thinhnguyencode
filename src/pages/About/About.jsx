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
  { icon: "🎓", text: "Sinh viên Thiết kế Web tại ITC" },
  { icon: "🏙️", text: "Sống và làm việc tại TP.HCM" },
];

const About = () => {
  return (
    <>
      <article>
        <Header
          title="Giới thiệu"
          subtitle="Một chút thú vị về tớ và những điều lớn lao"
        />

        <section className="flex justify-center">
          <div className="text-center my-2">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <img
                src={IMAGES.avatar}
                alt="avatar"
                className="w-full h-full rounded-full object-cover border border-gray-200"
              />
              <span
                className="absolute bottom-2 right-6 block w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"
                title="Đang hoạt động"
              ></span>
            </div>

            <div className="flex justify-center items-center gap-1.5 mb-2">
              <h1 className="font-playfair text-xl font-bold text-gray-800 dark:text-white">
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
          <SectionTitle>Kết nối</SectionTitle>
          <div className="flex flex-col gap-6">
            <Button className="w-[40%]" to="/cv">
              Resume
            </Button>
            <SocialLinks />
          </div>
        </section>

        <section className="mb-5">
          <Divider />
        </section>

        <section>
          <SectionTitle>Câu chuyện</SectionTitle>
          <p className="text-sm text-justify">
            Tớ xin phép được giới thiệu nhiều hơn về bản thân nhé. Tớ hiện đang
            sống và làm việc tại TP.HCM. Tớ đang là sinh viên năm cuối của
            trường nên tớ thực hiện và làm những dự án để tốt nghiệp. Website
            này cũng là những dự án mà tớ tâm huyết nhất. Mục đích của nó dùng
            để giới thiệu bản thân của tớ, giới thiệu về các dự án và xem dự án.
            Học vấn của tớ. Cùng với đó là những hình ảnh âm nhạc và những câu
            chuyện của tớ đã trải qua và những thứ tớ đạt được trong cuộc sống.
            Tớ rất thích với việc lập trình giao diện và tớ cũng đang tự học
            thêm nhiều ngôn ngữ lập trình để làm được những website hoàn chỉnh
            và hiện đại, độc đáo hơn. Tớ muốn và hướng đên việc trở thành một
            Fullstack Developer chuyên nghiệp. Ngoài ra, tớ siêu thích quay
            phim, chụp ảnh luôn í. Kiểu như tớ muốn lưu lại những khoảnh khắc
            đáng nhớ, đẹp nhất, dễ thương nhất của tớ cùng với gia đình, người
            iu, bạn bè và bản thân tớ. Tớ muốn truyền tải với mọi nguòi những gì
            mà tớ thấy và những thứ đẹp nhất đáng yêu nhất qua góc kính nhiệm
            màu nhiệm màu của tớ.
          </p>
        </section>

        <section className="my-5">
          <Divider />
        </section>

        <div>
          <SectionTitle>Những điều thú vị</SectionTitle>
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
        </div>
      </article>
    </>
  );
};

export default About;
