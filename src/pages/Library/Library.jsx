import React from "react";
import Footer from "../../components/Footer/Footer";

const Library = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-2xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Học vấn
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Trình độ học vấn của tôi
          </p>
          <div className="border-t border-gray-300 w-auto my-4"></div>
        </header>
        <section></section>
        <div className="border-t border-gray-300 w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default Library;
