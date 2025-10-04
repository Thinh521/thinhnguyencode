import { useParams, Link } from "react-router-dom";
import { timelineData } from "../../data/timelineData";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Divider from "../../components/Divider/Divider";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../../components/Carousel/carousel";
import StickyHeader from "../../components/Header/StickyHeader";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = timelineData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Không tìm thấy dự án</p>
        <Link to="/">
          <Button className="mt-4">Quay lại</Button>
        </Link>
      </div>
    );
  }

  return (
    <article>
      <StickyHeader title={project.title} />

      <Header
        title={`Dự án ${project.id}`}
        subtitle="Những dự án lập trình cá nhân / pet projects của mình từ Github"
      />

      <div className="max-w-4xl mx-auto space-y-6 mb-10">
        <p className="text-sm">
          {project.role} — {project.duration}
        </p>

        {/* Image */}
        <Carousel className="w-full" autoplay delay={3000}>
          <CarouselContent>
            {project.images?.map((img, idx) => (
              <CarouselItem key={idx}>
                <img
                  src={img}
                  alt={`${project.title} - ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselDots />
        </Carousel>

        <p className="text-base font-bold text-slate-900 dark:text-slate-50">
          {project.title}
        </p>

        <section>
          <SectionTitle>Mô tả dự án</SectionTitle>
          <ul className="list-disc pl-5 space-y-2">
            {project.responsibilities?.map((task, idx) => (
              <li key={idx} className="text-sm text-justify leading-relaxed">
                {task}
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <SectionTitle>Kỹ năng sử dụng</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {project.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-[#2C2C31] text-black dark:text-white rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* Links */}
        <section className="flex gap-4 flex-wrap">
          {project.links
            ?.filter(
              (link) =>
                link.label === "Xem Github" || link.label === "Xem Dự án"
            )
            .map((link, idx) =>
              link.internal ? (
                <Button key={idx} to={link.url} className="flex-1 text-center">
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  href={link.url}
                  newTab
                  className="flex-1 text-center"
                >
                  {link.label}
                </Button>
              )
            )}
        </section>
      </div>
    </article>
  );
}
