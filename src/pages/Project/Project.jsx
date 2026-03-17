import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { timelineData } from "../../data/timelineData";

// IMAGE
const ProjectImage = ({ src, alt }) => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-[220px] object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
    </div>
  );
};

// CARD
const ProjectCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <Link to={`/projects/${item.id}`}>
        <div
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden 
        hover:shadow-xl transition-all duration-500"
        >
          <ProjectImage src={item.images[0]} alt={item.title} />

          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="px-2 py-1 border rounded-md">{item.type}</span>
              <span>{item.duration}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-[var(--sm-accent)] transition">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {item.role}
            </p>

            <div className="pt-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--sm-accent)]">
                Xem chi tiết →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// MAIN GRID
export default function Projects() {
  return (
    <article>
      <Header
        title="Dự án"
        subtitle="Những dự án lập trình cá nhân / pet projects của mình từ Github"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {timelineData.map((item, index) => (
          <ProjectCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </article>
  );
}
