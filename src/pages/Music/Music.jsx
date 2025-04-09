import React from "react";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";
import MusicData from "../../data/MusicData";

const Music = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Nhạc Yêu Thích
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Những giai điệu làm nên cảm hứng
          </p>
          <Border />
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MusicData.map((song) => (
              <div
                key={song.id}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {song.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {song.description}
                  </p>

                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`${song.youtubeLink}?modestbranding=1&rel=0`}
                      title={song.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Border />
        <Footer />
      </article>
    </div>
  );
};

export default Music;
