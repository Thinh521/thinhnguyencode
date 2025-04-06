import React from "react";
import { Link } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import Footer from "../../components/Footer/Footer";

const Photo = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-2xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Ảnh chụp
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Những bức ảnh mà tớ tự chụp qua ống kính nhiệm màu.
          </p>
          <div className="border-t border-gray-300 w-auto my-4"></div>
        </header>
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PhotoData.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded shadow hover:shadow-lg transition"
              >
                <Link to={`photo-detail/${item.id}`}>
                  <img
                    src={`images/${item.images[0]}`}
                    alt={item.title}
                    className="rounded w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-3">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <div className="border-t border-gray-300 w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default Photo;
