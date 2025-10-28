import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import StoryViewer from "../../components/StoryViewer/StoryViewer";
import storiesData from "../../data/StoriesData";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
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
} from "lucide-react";
import "./Photo.css";
import { removeVietnameseTones } from "../../utils/stringUtils";
import Divider from "../../components/Divider/Divider";

const StoryAvatar = ({ story, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(index)}
      className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0"
      style={{ width: "80px" }}
    >
      <div className="relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 relative transform rotate-45">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping"
                    style={{
                      top: i < 2 ? 0 : "auto",
                      bottom: i >= 2 ? 0 : "auto",
                      left: i % 3 === 0 ? 0 : "auto",
                      right: i % 3 !== 0 ? 0 : "auto",
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: "1.2s",
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="w-16 h-16 rounded-full border-2 border-gray-400 dark:border-neutral-400 p-0.5 overflow-hidden group bg-gray-200 dark:bg-neutral-700">
          <video
            src={`/thinhnguyencode/videos/${story.video}`}
            className={`w-full h-full object-cover rounded-full transition-opacity duration-300 bg-gray-100 dark:bg-neutral-800 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            preload="metadata"
            onLoadedMetadata={(e) => {
              e.target.currentTime = 0.001;
              e.target.pause();
              setIsLoaded(true);
            }}
            onError={() => setIsLoaded(true)}
          />
        </div>
      </div>
      <p className="text-xs text-center text-black dark:text-white w-full truncate">
        {story.username}
      </p>
    </div>
  );
};

const Photo = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categoryIcons = {
    "Tất cả": Sparkles,
    "Đời thường": Smile,
    "Chân dung": Camera,
    "Du lịch": MapPin,
    "Sáng tạo": ImageIcon,
    "Ẩm thực": Utensils,
    "Công việc": Briefcase,
  };

  const handleStoryClick = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  const categories = useMemo(() => {
    const unique = new Set(["Tất cả"]);
    PhotoData.forEach((p) => p.category.forEach((c) => unique.add(c)));
    return Array.from(unique);
  }, []);

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

  const totalImages = useMemo(() => {
    return filteredPhotos.reduce((sum, item) => sum + item.images.length, 0);
  }, [filteredPhotos]);

  return (
    <article>
      <Header
        title="Ảnh & tin"
        subtitle="Những bức ảnh mà mình tự chụp qua ống kính nhiệm màu"
      />

      <section className="space-y-8">
        <div>
          <SectionTitle>Tin nổi bật</SectionTitle>
          <div className="relative">
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div
                className="flex space-x-4"
                style={{ minWidth: "max-content" }}
              >
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
          </div>
        </div>

        <section>
          <SectionTitle>Ống kính nhiệm màu</SectionTitle>

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

          <div className="relative mb-6">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat] || Sparkles;
                  const isActive = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-1.5 whitespace-nowrap px-5 py-1.5 text-sm rounded-full border transition-all duration-200 group
                              ${
                                isActive
                                  ? "dark:bg-white bg-neutral-800 text-white dark:text-black border-neutral-800 dark:border-white shadow-sm"
                                  : "bg-white dark:bg-neutral-900 text-black dark:text-white border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
                              }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? "text-white dark:text-black"
                            : "text-black dark:text-white group-hover:-translate-x-0.5"
                        }`}
                      />
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-base font-semibold text-black dark:text-white text-right mb-3">
            Hiển thị <span className="font-semibold">{totalImages}</span> ảnh
          </p>

          {filteredPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                Không tìm thấy ảnh nào phù hợp.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <Link
                  key={photo.id}
                  to={`/photos/${photo.id}`}
                  className="relative group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:border-gray-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.images[0]}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 z-10 p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-between">
                    <p className="truncate font-medium text-xs text-white">
                      {photo.title}
                    </p>
                    <ArrowRight className="w-4 h-4 text-white group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>

      <section className="mt-5">
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
    </article>
  );
};

export default Photo;
