import React from "react";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const Writing = () => {
  return (
    <article>
      <header>
        <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          Câu chuyện
        </h1>
        <p className="dark:text-white font-medium mb-2">
          Những câu chuyện mà tớ viết
        </p>
        <Border />
      </header>
      <section></section>
      <Border />
      <Footer />
    </article>
  );
};

export default Writing;
