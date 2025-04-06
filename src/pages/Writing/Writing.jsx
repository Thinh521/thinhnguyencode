import React from "react";
import Footer from "../../components/Footer/Footer";

const Writing = () => {
  return (
    <article>
      <header>
        <h1 className="font-playfair text-2xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          Câu chuyện
        </h1>
        <p className="text-gray-800 dark:text-white font-medium">
          Những câu chuyện mà tớ viết
        </p>
        <div className="border-t border-gray-300 w-auto my-4"></div>
      </header>
      <section></section>
      <div className="border-t border-gray-300 w-auto my-4"></div>
      <Footer />
    </article>
  );
};

export default Writing;
