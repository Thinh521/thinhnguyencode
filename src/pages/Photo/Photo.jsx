import React from "react";
import { Link } from "react-router-dom";
import PhotoData from "../../data/PhotoData";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const Photo = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Ảnh chụp
          </h1>
          <p className="text-base">
            Những bức ảnh mà tôi tự chụp qua ống kính nhiệm màu.
          </p>
          <Border />
        </header>
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PhotoData.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded shadow hover:shadow-lg transition dark:bg-neutral-800 bg-white border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
              >
                <Link to={`photo-detail/${item.id}`}>
                  <img
                    src={`images/${item.images[0]}`}
                    alt={item.title}
                    className="rounded w-full h-auto object-cover transition-transform duration-300"
                  />
                  <div className="p-4 grid gap-y-1">
                    <h2 className="text-base font-semibold dark:text-white truncate">
                      {item.title}
                    </h2>
                    <p className="text-sm truncate">{item.date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default Photo;
