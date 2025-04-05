import React from "react";

const songsData = [
  {
    id: 1,
    name: "Beat Saber Theme",
    description: "Bài hát từ trò chơi Beat Saber với thể loại EDM.",
    youtubeLink: "https://www.youtube.com/embed/WCm2elbTEZQ",
  },
];

const Music = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Nghe Nhạc
          </h1>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Các bản nhạc yêu thích của tôi
          </p>
          <div className="border-t border-gray-300 dark:border-gray-700 w-auto my-4"></div>
        </header>

        <section>
          <ul>
            {songsData.map((song) => (
              <li
                key={song.id}
                className="mb-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {song.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {song.description}
                </p>
                <iframe
                  width="100%"
                  height="315"
                  src={song.youtubeLink}
                  title={song.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mt-2"
                ></iframe>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-gray-300 dark:border-gray-700 w-auto my-4"></div>

        <footer className="text-gray-800 dark:text-white space-y-1 mt-4 text-center">
          <p>Dùng máy tính để có trải nghiệm nghe nhạc tốt nhất nhé</p>
          <p>Nguyễn Phúc Thịnh</p>
          <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
        </footer>
      </article>
    </>
  );
};

export default Music;
