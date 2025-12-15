import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Search,
  Camera,
  Utensils,
  Briefcase,
  ImageIcon,
  Smile,
  MapPin,
  Sparkles,
} from "lucide-react";
import PhotoData from "../../data/PhotoData";
import storiesData from "../../data/StoriesData";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Divider from "../../components/Divider/Divider";
import { removeVietnameseTones } from "../../utils/stringUtils";
import useViewedStories from "../../hooks/useViewedStories";

import "./Photo.css";
import StoryAvatar from "./components/StoryAvatar";
import PhotoThumbnail from "./components/PhotoThumbnail ";
import StoryViewer from "./components/StoryViewer";

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

          {/* Search and category */}
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
