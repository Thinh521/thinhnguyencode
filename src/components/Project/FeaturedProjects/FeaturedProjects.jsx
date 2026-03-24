import { Link } from "react-router-dom";

export default function FeaturedProjects({
  projects = [],
  columns = "grid-cols-1 sm:grid-cols-3",
}) {
  return (
    <div className={`grid ${columns} gap-5`}>
      {projects.map((project, i) => (
        <Link
          to={`/projects/${project.id}`}
          className="group block rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20 shadow-md backdrop-blur-md transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={project.images?.[0]}
              alt={project.title}
              loading="lazy"
              className="block w-full h-44 object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-95 group-hover:saturate-105"
            />

            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5 rounded bg-black/60 text-white">
                {project.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-black dark:text-white font-semibold text-sm leading-snug mb-1 line-clamp-1">
              {project.title}
            </p>

            <p className="font-mono text-[0.58rem] text-neutral-500 dark:text-neutral-400 tracking-wide">
              {project.duration}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mt-3">
              {project.skills?.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="font-mono text-[0.54rem] tracking-wide uppercase px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
