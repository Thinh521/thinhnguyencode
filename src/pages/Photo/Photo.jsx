import { useState } from "react";
import { Link } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import StoryViewer from "../../components/StoryViewer/StoryViewer";
import storiesData from "../../data/StoriesData";
import Header from "../../components/Header/Header";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./Photo.css";

const StoryAvatar = ({ story, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onClick(index)}
      className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0"
      style={{ width: "80px" }}
    >
      <div className="relative">
        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 relative transform rotate-45">
              <div
                className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping"
                style={{ top: 0, left: 0, animationDuration: "1.2s" }}
              />
              <div
                className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping"
                style={{
                  top: 0,
                  right: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.15s",
                }}
              />
              <div
                className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping"
                style={{
                  bottom: 0,
                  right: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.3s",
                }}
              />
              <div
                className="absolute bg-neutral-900 dark:bg-white w-2 h-2 animate-ping"
                style={{
                  bottom: 0,
                  left: 0,
                  animationDuration: "1.2s",
                  animationDelay: "0.45s",
                }}
              />
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
      <p className="text-xs text-center text-gray-600 dark:text-gray-300 w-full truncate">
        {story.username}
      </p>
    </div>
  );
};

const Photo = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleStoryClick = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <article>
      <Header
        title="Ảnh chụp & tin nổi bật"
        subtitle="Những bức ảnh mà mình tự chụp qua ống kính nhiệm màu"
      />

      <section className="space-y-4">
        {/* Stories */}
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

        {/* Photos */}
        <div>
          <SectionTitle>Ảnh chụp</SectionTitle>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {PhotoData.map((photo) => (
              <Link
                key={photo.id}
                to={`/photo-detail/${photo.id}`}
                className="relative group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:border-gray-300 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`/thinhnguyencode/images/${photo.images[0]}`}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <p className="truncate font-medium text-xs text-white">
                    {photo.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
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
