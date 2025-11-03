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
import { Code2 } from "lucide-react";
import { skillIcons } from "../../data/skillIcons";
import BackButton from "../../components/Button/BackButton";

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

        <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
          {project.title}
        </h3>

        <section>
          <SectionTitle className="mb-2">Mô tả dự án</SectionTitle>
          <ul className="space-y-4">
            {project.responsibilities?.map((task, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-2 flex-shrink-0 w-2 h-2 rotate-45 bg-gray-400 dark:bg-gray-500 rounded-sm" />
                <p className="text-sm text-justify leading-relaxed">{task}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <SectionTitle className="mb-4">Kỹ năng sử dụng</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {project.skills?.map((skill, idx) => {
              const Icon = skillIcons[skill] || Code2;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 px-4 py-2 rounded-full shadow-sm">
                    <Icon size={16} className="text-gray-700 dark:text-white" />
                    <span className="text-xs text-gray-700 dark:text-white">
                      {skill}
                    </span>
                  </div>
                </div>
              );
            })}
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

        <Divider />

        <BackButton className="mt-5 mb-10" />
      </div>
    </article>
  );
}
