import { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
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
import useViewedStories from "../../hooks/useViewedStories";

import "./Photo.css";

/* ------------------ Story Avatar (memoized) ------------------ */
const StoryAvatar = memo(({ story, index, onClick, viewed }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const borderClass = viewed
    ? "bg-gray-400 p-[2.5px]"
    : "bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2.5px]";

  const handleLoaded = useCallback((e) => {
    e.target.currentTime = 0.001;
    e.target.pause();
    setIsLoaded(true);
  }, []);

  const isDisabled = !isLoaded;

  return (
    <div
      onClick={() => !isDisabled && onClick(index)}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => !isDisabled && setIsHovered(false)}
      className={`flex flex-col items-center space-y-2.5 flex-shrink-0 group transition-all ${
        isDisabled ? "cursor-default opacity-70" : "cursor-pointer"
      }`}
      style={{ width: "80px" }}
    >
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-5 h-5 transform rotate-45">
              {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                <div
                  key={i}
                  className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping rounded-sm opacity-60"
                  style={{
                    animationDuration: "1.2s",
                    animationDelay: `${delay}s`,
                    ...(i === 0
                      ? { top: 0, left: 0 }
                      : i === 1
                      ? { top: 0, right: 0 }
                      : i === 2
                      ? { bottom: 0, right: 0 }
                      : { bottom: 0, left: 0 }),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`relative w-[64px] h-[64px] rounded-full ${borderClass}`}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700">
            <video
              src={`/thinhnguyencode/videos/${story.video}`}
              className={`w-full h-full object-cover rounded-full transition-opacity duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              preload="metadata"
              onLoadedMetadata={handleLoaded}
              onError={() => setIsLoaded(true)}
            />
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/25 rounded-full transition-opacity duration-300 ${
              isHovered && isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Play className="w-5 h-5 text-white fill-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      <p
        className={`text-xs font-medium text-center w-full truncate transition-colors duration-200 ${
          isDisabled
            ? "text-gray-400 dark:text-gray-500"
            : "text-black dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400"
        }`}
      >
        {story.username}
      </p>
    </div>
  );
});
StoryAvatar.displayName = "StoryAvatar";

/* ------------------ Photo Thumbnail (with Loading) ------------------ */
const PhotoThumbnail = memo(({ photo, idx }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl dark:bg-neutral-800 border-2 border-transparent animate-fadeInUp ${
        isLoaded ? "hover:-translate-y-1" : "pointer-events-none opacity-80"
      }`}
      style={{ animationDelay: `${idx * 50}ms` }}
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800 relative">
        {/* Hiệu ứng loading */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900">
            <div className="relative w-10 h-10 transform rotate-45">
              {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                <div
                  key={i}
                  className="absolute bg-neutral-900 dark:bg-white w-4 h-4 animate-ping rounded-sm opacity-60"
                  style={{
                    animationDuration: "1.2s",
                    animationDelay: `${delay}s`,
                    ...(i === 0
                      ? { top: 0, left: 0 }
                      : i === 1
                      ? { top: 0, right: 0 }
                      : i === 2
                      ? { bottom: 0, right: 0 }
                      : { bottom: 0, left: 0 }),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ảnh chính */}
        <img
          src={photo.images[0]}
          alt={photo.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          } group-hover:scale-110`}
        />
      </div>

      {/* Phần nội dung chỉ hiện khi đã load xong */}
      {isLoaded && (
        <>
          {/* Overlay dưới */}
          <div className="absolute bottom-0 left-0 right-0 z-10 py-2 px-3 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
            <div className="flex items-center justify-between">
              <p className="truncate font-semibold text-sm text-white drop-shadow-lg">
                {photo.title}
              </p>
              <div className="flex-shrink-0 ml-2 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Số lượng ảnh */}
          <div className="absolute top-3 right-3 z-10 bg-black/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {photo.images.length}
          </div>

          {/* Bọc toàn bộ bằng Link sau khi loaded */}
          <Link
            to={`/photos/${photo.id}`}
            className="absolute inset-0 z-20"
            aria-label={`Xem bộ sưu tập ${photo.title}`}
          />
        </>
      )}
    </div>
  );
});
PhotoThumbnail.displayName = "PhotoThumbnail";

/* ------------------ Main Component ------------------ */
export default function Photo() {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const categoryRefs = useRef({});

  const { markAsViewed, isViewed } = useViewedStories();

  const categoryIcons = useMemo(
    () => ({
      "Tất cả": Sparkles,
      "Đời thường": Smile,
      "Chân dung": Camera,
      "Du lịch": MapPin,
      "Sáng tạo": ImageIcon,
      "Ẩm thực": Utensils,
      "Công việc": Briefcase,
    }),
    []
  );

  const handleStoryClick = useCallback(
    (index) => {
      const storyId = storiesData[index].id;
      markAsViewed(storyId);
      setStartIndex(index);
      setOpen(true);
    },
    [markAsViewed]
  );

  const handleCategoryClick = useCallback((cat) => {
    setSelectedCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  useEffect(() => {
    const el = categoryRefs.current["Tất cả"];
    if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(["Tất cả"]);
    for (const p of PhotoData) {
      for (const c of p.category) unique.add(c);
    }
    return Array.from(unique);
  }, []);

  const filteredPhotos = useMemo(() => {
    const searchNormalized = removeVietnameseTones(search.toLowerCase());
    return PhotoData.filter((photo) => {
      const inCategory =
        selectedCategory === "Tất cả" ||
        photo.category.includes(selectedCategory);
      const titleNormalized = removeVietnameseTones(photo.title.toLowerCase());
      return inCategory && titleNormalized.includes(searchNormalized);
    });
  }, [search, selectedCategory]);

  const totalImages = useMemo(
    () => filteredPhotos.reduce((sum, item) => sum + item.images.length, 0),
    [filteredPhotos]
  );

  return (
    <article className="pb-8">
      <Header
        title="Ảnh & Tin"
        subtitle="Những bức ảnh mình chụp qua ống kính nhiệm màu"
      />

      <section className="space-y-10">
        <div>
          <SectionTitle className="mb-4">Tin nổi bật</SectionTitle>
          <div className="overflow-x-auto pb-3 scrollbar-hide">
            <div className="flex space-x-4 px-1 min-w-max">
              {storiesData.map((story, index) => (
                <StoryAvatar
                  key={story.id}
                  story={story}
                  index={index}
                  viewed={isViewed(story.id)}
                  onClick={handleStoryClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <section>
          <SectionTitle className="mb-4">Ống kính nhiệm màu</SectionTitle>

          {/* Search */}
          <div className="relative w-full sm:w-80 mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm ảnh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 dark:border-neutral-700/50 rounded-full 
                         bg-white dark:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-gray-200  dark:focus:ring-neutral-700 transition"
            />
          </div>

          {/* Categories */}
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
                      className={`relative group flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-black dark:text-white"
                          : " hover:text-black hover:dark:text-white"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors duration-200 ${
                          isActive
                            ? "text-black dark:text-white"
                            : "group-hover:dark:text-white"
                        }`}
                      />
                      {cat}
                    </button>
                  );
                })}
                <span
                  className="absolute bottom-0 h-1 bg-gray-400 dark:bg-neutral-400 transition-all duration-300 ease-out rounded-tl-full rounded-tr-full"
                  style={indicatorStyle}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {filteredPhotos.length > 0 ? (
                <>
                  Tìm thấy{" "}
                  <span className="font-bold text-black dark:text-white">
                    {filteredPhotos.length}
                  </span>{" "}
                  bộ sưu tập
                </>
              ) : (
                <span className="italic">Không tìm thấy kết quả</span>
              )}
            </p>
            <p className="text-base font-semibold text-black dark:text-white">
              <span>{totalImages}</span> ảnh
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
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-2">
              {filteredPhotos.map((photo, idx) => (
                <PhotoThumbnail key={photo.id} photo={photo} idx={idx} />
              ))}
            </div>
          )}
        </section>
      </section>

      <section className="my-10">
        <Divider />
      </section>

      {open && (
        <StoryViewer
          storyList={storiesData}
          onClose={() => setOpen(false)}
          initialIndex={startIndex}
          key={startIndex}
        />
      )}
    </article>
  );
}
