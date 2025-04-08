import React from "react";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";
import MusicData from "../../data/MusicData";

const Music = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nghe Nhạc
          </h1>
          <p className="text-base">Các bản nhạc yêu thích của tôi</p>
          <Border />
        </header>
        <section>
          <ul>
            {MusicData.map((song) => (
              <li
                key={song.id}
                className="mb-4 p-4 dark:bg-neutral-800 bg-white border-b border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 truncate">
                  {song.name}
                </h3>
                <iframe
                  width="100%"
                  height="315"
                  src={song.youtubeLink}
                  title={song.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mt-3"
                ></iframe>
              </li>
            ))}
          </ul>
        </section>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default Music;
