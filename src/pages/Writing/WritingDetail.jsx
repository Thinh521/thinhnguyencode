import React from "react";

const WritingDetail = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Dự án
          </h1>
          <p className="text-base">
            Những dự án lập trình cá nhân/pet projects của tôi từ Github
          </p>
          <Border />
        </header>
        <section className=""></section>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default WritingDetail;
