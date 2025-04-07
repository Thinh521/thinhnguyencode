import React from "react";
import { useParams } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import Footer from "../../components/Footer/Footer";

const PhotoDetail = () => {
  const { id } = useParams();
  const photoItem = PhotoData.find((item) => item.id === parseInt(id));

  if (!photoItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }

  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
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
                src={`/thinhnguyencode/images/${img}`}
                alt={img}
                className="rounded shadow-md"
              />
            ))}
          </div>
        </section>

        <div className="border-t border-gray-300 w-auto my-4"></div>
        <p>Những bức ảnh do tớ tự chụp</p>
        <div className="border-t border-gray-300 w-auto my-8"></div>
        <Footer />
      </article>
    </>
  );
};

export default PhotoDetail;
