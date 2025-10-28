import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Camera,
  Utensils,
  Briefcase,
  ImageIcon,
  Smile,
  MapPin,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";

import PhotoData from "../../data/PhotoData";
import storiesData from "../../data/StoriesData";
import StoryViewer from "../../components/StoryViewer/StoryViewer";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Divider from "../../components/Divider/Divider";
import { removeVietnameseTones } from "../../utils/stringUtils";

import "./Photo.css";

/* ------------------ Story Avatar Component ------------------ */
const StoryAvatar = ({ story, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center space-y-2.5 cursor-pointer flex-shrink-0 group"
      style={{ width: "90px" }}
    >
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-5 h-5 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}

        <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2.5px] transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/30">
          <div className="w-full h-full rounded-full border-[3px] border-white dark:border-neutral-900 overflow-hidden bg-gray-200 dark:bg-neutral-700">
            <video
              src={`/thinhnguyencode/videos/${story.video}`}
              className={`w-full h-full object-cover rounded-full transition-all duration-300 bg-gray-100 dark:bg-neutral-800 ${
                isLoaded ? "opacity-100" : "opacity-0"
              } ${isHovered ? "scale-110" : "scale-100"}`}
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              onLoadedMetadata={(e) => {
                e.target.currentTime = 0.001;
                e.target.pause();
                setIsLoaded(true);
              }}
              onError={() => setIsLoaded(true)}
            />
          </div>

          {/* Play overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/25 rounded-full transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Play className="w-5 h-5 text-white fill-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      <p className="text-xs font-medium text-center text-black dark:text-white w-full truncate transition-colors duration-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
        {story.username}
      </p>
    </div>
  );
};

/* ------------------ Main Photo Page ------------------ */
export default function Photo() {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const categoryRefs = useRef({});

  /* Category icon mapping */
  const categoryIcons = {
    "Tất cả": Sparkles,
    "Đời thường": Smile,
    "Chân dung": Camera,
    "Du lịch": MapPin,
    "Sáng tạo": ImageIcon,
    "Ẩm thực": Utensils,
    "Công việc": Briefcase,
  };

  /* Stories open handler */
  const handleStoryClick = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  /* Category list */
  const categories = useMemo(() => {
    const unique = new Set(["Tất cả"]);
    PhotoData.forEach((p) => p.category.forEach((c) => unique.add(c)));
    return Array.from(unique);
  }, []);

  /* Category click + underline animation */
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  /* On mount: set indicator position for "Tất cả" */
  useEffect(() => {
    const el = categoryRefs.current["Tất cả"];
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [categories]);

  /* Filtered photos */
  const filteredPhotos = useMemo(() => {
    return PhotoData.filter((photo) => {
      const matchesCategory =
        selectedCategory === "Tất cả" ||
        photo.category.includes(selectedCategory);

      const titleNoAccent = removeVietnameseTones(photo.title).toLowerCase();
      const searchNoAccent = removeVietnameseTones(search).toLowerCase();

      const matchesSearch = titleNoAccent.includes(searchNoAccent);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  /* Total count */
  const totalImages = useMemo(
    () => filteredPhotos.reduce((sum, item) => sum + item.images.length, 0),
    [filteredPhotos]
  );

  return (
    <article className="pb-8">
      <Header
        title="Ảnh & tin"
        subtitle="Những bức ảnh mình chụp qua ống kính nhiệm màu"
      />

      <section className="space-y-10">
        {/* ----------- Stories Section ----------- */}
        <div className="relative">
          <SectionTitle>Tin nổi bật</SectionTitle>

          <div className="relative">
            <div className="overflow-x-auto pb-3 scrollbar-hide">
              <div className="flex space-x-5 px-1 min-w-max">
                {storiesData.map((story, index) => (
                  <StoryAvatar
                    key={story.id}
                    story={story}
                    index={index}
                    onClick={handleStoryClick}
                  />
                ))}
              </div>
            </div>

            {/* Edge fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ----------- Gallery Section ----------- */}
        <section>
          <SectionTitle>Ống kính nhiệm màu</SectionTitle>

          {/* Search */}
          <div className="relative w-full sm:w-96 mb-5 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500 transition-colors group-focus-within:text-purple-500" />
            <input
              type="text"
              placeholder="Tìm kiếm ảnh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm border-2 border-gray-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-400 transition-all duration-200"
            />
          </div>

          {/* Category Filter (Shopee style) */}
          <div className="relative mb-6 border-b border-gray-200 dark:border-neutral-700">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max relative">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat] || Sparkles;
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      ref={(el) => (categoryRefs.current[cat] = el)}
                      onClick={() => handleCategoryClick(cat)}
                      className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-orange-500 dark:text-orange-400"
                          : "text-gray-600 dark:text-neutral-400 hover:text-orange-500"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-orange-500 dark:text-orange-400"
                            : "text-gray-500 dark:text-neutral-500 group-hover:text-orange-500"
                        }`}
                      />
                      {cat}
                    </button>
                  );
                })}
                <span
                  className="absolute bottom-0 h-0.5 bg-orange-500 dark:bg-orange-400 transition-all duration-300 ease-out"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {filteredPhotos.length > 0 ? (
                <>
                  Tìm thấy{" "}
                  <span className="font-bold text-purple-600">
                    {filteredPhotos.length}
                  </span>{" "}
                  bộ sưu tập
                </>
              ) : (
                <span className="italic">Không tìm thấy kết quả</span>
              )}
            </p>
            <p className="text-base font-semibold text-black dark:text-white">
              <span className="text-purple-600">{totalImages}</span> ảnh
            </p>
          </div>

          {/* Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl border-2 border-dashed border-gray-300 dark:border-neutral-700">
              <ImageIcon className="w-16 h-16 text-gray-300 dark:text-neutral-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                Không tìm thấy ảnh nào
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Thử từ khóa khác nhé!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
              {filteredPhotos.map((photo, idx) => (
                <Link
                  key={photo.id}
                  to={`/photos/${photo.id}`}
                  className="relative group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:bg-neutral-800 border-2 border-transparent hover:border-purple-500/30 hover:-translate-y-1"
                  style={{
                    animationDelay: `${idx * 50}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800">
                    <img
                      src={photo.images[0]}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-semibold text-sm text-white">
                        {photo.title}
                      </p>
                      <div className="ml-2 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-purple-500">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {photo.images.length} ảnh
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ImageIcon className="w-3 h-3" />
                    {photo.images.length}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>

      <section className="mt-10">
        <Divider />
      </section>

      {/* Story Viewer */}
      {open && (
        <StoryViewer
          storyList={storiesData}
          onClose={() => setOpen(false)}
          initialIndex={startIndex}
          key={startIndex}
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );
}
