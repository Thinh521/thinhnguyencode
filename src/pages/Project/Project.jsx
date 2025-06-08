import React, { useState, useMemo, memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectData from "../../data/ProjectData";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

// Work position configuration with enhanced styling
const WORK_POSITION_CONFIG = {
  "Full Stack": {
    bg: "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
    text: "text-green-800 dark:text-green-400",
    border: "border-green-200 dark:border-green-700",
    icon: "🚀",
  },
  "Front end": {
    bg: "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
    text: "text-blue-800 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-700",
    icon: "🎨",
  },
  "Back end": {
    bg: "bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30",
    text: "text-red-800 dark:text-red-400",
    border: "border-red-200 dark:border-red-700",
    icon: "⚡",
  },
  default: {
    bg: "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800",
    text: "text-gray-800 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-600",
    icon: "📝",
  },
};

// Filter options
const FILTER_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "Front end", label: "Frontend" },
  { value: "Back end", label: "Backend" },
];

const SearchInput = memo(({ searchTerm, onSearchChange, onClear }) => (
  <div className="relative">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm dự án..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-600 
                 rounded-xl text-gray-900 dark:text-gray-100
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 transition-all duration-300 shadow-sm hover:shadow-md"
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center
                   text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                   transition-colors duration-200"
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  </div>
));

SearchInput.displayName = "SearchInput";

// Memoized Filter Tabs Component
const FilterTabs = memo(({ activeFilter, onFilterChange }) => (
  <div className="flex flex-wrap gap-2">
    {FILTER_OPTIONS.map(({ value, label, icon }) => (
      <button
        key={value}
        onClick={() => onFilterChange(value)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                   transition-all duration-300 transform hover:scale-105
                   ${
                     activeFilter === value
                       ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                       : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                   }`}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </button>
    ))}
  </div>
));

FilterTabs.displayName = "FilterTabs";

// Memoized Project Card Component
const ProjectCard = memo(({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const config =
    WORK_POSITION_CONFIG[project.workPosition] || WORK_POSITION_CONFIG.default;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl
                 bg-white dark:bg-gray-800/50 backdrop-blur-sm
                 border border-gray-200 dark:border-gray-700
                 shadow-sm hover:shadow-xl
                 transition-all duration-500 ease-out
                 transform hover:scale-[1.02] hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${config.bg}`}
      ></div>

      <Link to={`project-detail/${project.id}`} className="block p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <h3
              className="text-xl font-bold text-gray-900 dark:text-white 
                         group-hover:text-blue-600 dark:group-hover:text-blue-400
                         transition-colors duration-300 line-clamp-2 flex-1"
            >
              {project.title}
            </h3>
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bg} ${config.border} border
                           flex items-center justify-center text-lg
                           transform transition-transform duration-300 group-hover:scale-110`}
            >
              {config.icon}
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-base leading-relaxed">
              {project.description}
            </p>
            <div
              className="absolute bottom-0 right-0 w-8 h-6 
                           bg-gradient-to-l from-white dark:from-gray-800/50 to-transparent"
            ></div>
          </div>

          {/* Tags and Date */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                             border ${config.bg} ${config.text} ${config.border}
                             transform transition-transform duration-300 group-hover:scale-105`}
            >
              <span>{config.icon}</span>
              {project.workPosition}
            </span>

            <time
              className="text-xs text-gray-500 dark:text-gray-400 font-medium
                           px-2 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-md"
            >
              {project.date}
            </time>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-2.5 
                           border border-gray-300 dark:border-gray-600 
                           rounded-xl text-sm font-medium
                           bg-gray-50 dark:bg-gray-700/30
                           hover:bg-blue-50 dark:hover:bg-blue-900/20
                           hover:border-blue-300 dark:hover:border-blue-600
                           hover:text-blue-600 dark:hover:text-blue-400
                           transition-all duration-300 transform hover:scale-105"
            >
              <span>Xem chi tiết</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

// Empty State Component
const EmptyState = memo(({ searchTerm, activeFilter, onReset }) => (
  <div className="text-center py-16">
    <div
      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 
                   dark:from-gray-700 dark:to-gray-600 rounded-full
                   flex items-center justify-center text-4xl"
    >
      🔍
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
      Không tìm thấy dự án
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      {searchTerm
        ? `Không có dự án nào phù hợp với "${searchTerm}"`
        : `Không có dự án nào trong danh mục "${activeFilter}"`}
    </p>
    <button
      onClick={onReset}
      className="inline-flex items-center gap-2 px-4 py-2 
               bg-blue-500 hover:bg-blue-600 text-white 
               rounded-xl font-medium transition-colors duration-300"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Đặt lại bộ lọc
    </button>
  </div>
));

EmptyState.displayName = "EmptyState";

const Project = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized filtering logic
  const filteredProjects = useMemo(() => {
    return ProjectData.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.workPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || item.workPosition.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  // Handlers
  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    setActiveFilter("all");
  }, []);

  return (
    <article
      className={`max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <header className="text-center mb-4">
        <h1 className="font-playfair text-4xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
          Dự án
        </h1>
        <p className="text-sm text-left">
          Những dự án lập trình cá nhân / pet projects của tớ từ Githu
        </p>
        <Border />
      </header>

      {/* Filters and Search */}
      <section className="mb-8">
        <h2>Tìm kiếm repository Github</h2>
        <p className="text-sm text-left mb-4">
          Các pet project/public repository sử dụng Node.js, React...
        </p>
        <div className="flex flex-col gap-6 mb-6">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClear={handleSearchClear}
          />
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>Hiển thị</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {filteredProjects.length}
          </span>
          <span>dự án</span>
          {(searchTerm || activeFilter !== "all") && (
            <>
              <span>•</span>
              <button
                onClick={handleReset}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Xóa bộ lọc
              </button>
            </>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mb-12">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            onReset={handleReset}
          />
        )}
      </section>

      <Border />
      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </article>
  );
};

export default memo(Project);
