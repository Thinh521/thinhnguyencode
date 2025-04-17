import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";
import StoryViewer from "../../components/StoryViewer/StoryViewer";
import storiesData from "../../data/StoriesData";
import "./Photo.css";

const Photo = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleStoryClick = (index) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <article>
      <header className="mb-6">
        <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          Ảnh chụp và tin
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          Những bức ảnh mà tôi tự chụp qua ống kính nhiệm màu.
        </p>
        <Border className="my-4" />
      </header>

      <section className="space-y-4">
        {/* Stories Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
            Tin nổi bật
          </h2>
          <div className="relative">
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div
                className="flex space-x-4"
                style={{ minWidth: "max-content" }}
              >
                {storiesData.map((story, index) => (
                  <div
                    key={story.id}
                    onClick={() => handleStoryClick(index)}
                    className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0"
                    style={{ width: "80px" }}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-400 dark:border-neutral-400 p-0.5 overflow-hidden group">
                        <video
                          src={`/thinhnguyencode/videos/${story.video}`}
                          className="w-full h-full object-cover rounded-full"
                          muted
                          playsInline
                          controls={false}
                          disablePictureInPicture
                          preload="metadata"
                          onLoadedMetadata={(e) => {
                            // Dừng ngay tại frame đầu tiên
                            e.target.currentTime = 0.001;
                            e.target.pause();
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-center text-gray-600 dark:text-gray-300 w-full truncate">
                      {story.username}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
            Ảnh chụp
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {PhotoData.map((photo) => (
              <Link
                key={photo.id}
                to={`photo-detail/${photo.id}`}
                className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-neutral-800 bg-white border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`/thinhnguyencode/images/${photo.images[0]}`}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 truncate">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {photo.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Border className="my-8" />
      <Footer />

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
