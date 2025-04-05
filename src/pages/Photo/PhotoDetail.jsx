import React from "react";
import { useParams } from "react-router-dom";
import PhotoData from "../../data/PhotoData";

const PhotoDetail = () => {
  const { id } = useParams();
  const photoItem = PhotoData.find((item) => item.id === parseInt(id));

  if (!photoItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">
          Không tìm thấy ảnh với ID này!
        </h2>
      </div>
    );
  }

  return (
    <>
      <article>
        <header>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            {photoItem.title}
          </h1>
          <p className="text-sm text-gray-500 mb-2">{photoItem.date}</p>
          <p className="text-gray-800 dark:text-white font-medium mb-4">
            {photoItem.description}
          </p>
          <div className="border-t border-gray-300 w-auto my-4"></div>
        </header>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {photoItem.images.map((img) => (
              <img
                key={img}
                src={`/images/${img}`}
                alt={img}
                className="rounded shadow-md"
              />
            ))}
          </div>
        </section>

        <div className="border-t border-gray-300 w-auto my-4"></div>
        <p>Những bức ảnh do tớ tự chụp</p>
        <div className="border-t border-gray-300 w-auto my-8"></div>
        <footer className="text-gray-800 dark:text-white space-y-1 mt-4 mb-36">
          <p>Dùng máy tính để có trải nghiệm tốt nhất nhé</p>
          <p>Nguyễn Phúc Thịnh</p>
          <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
        </footer>
      </article>
    </>
  );
};

export default PhotoDetail;
