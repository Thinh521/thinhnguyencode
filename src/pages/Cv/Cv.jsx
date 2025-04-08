import React from "react";
import Border from "../../components/Border/Border";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Cv = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Resume
          </h1>
          <p className="text-base">
            Resume cá nhân của tớ cho các nhà tuyển dụng.
          </p>
          <Border />
        </header>
        <section className="mb-4">
          <img
            src="/thinhnguyencode/images/resume_1.jpg"
            alt=""
            className="border border-neutral-400 mb-2"
          />
          <img
            src="/thinhnguyencode/images/resume_2.jpg"
            alt=""
            className="border border-neutral-400"
          />
        </section>
        <p className="mb-4">Resume cá nhân của tớ</p>
        <div className="border-t border-dashed border-gray-300 dark:border-neutral-400  w-auto my-4"></div>
        <Link
          to="/"
          className="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block"
        >
          Quay lại
        </Link>
        <Footer />
      </article>
    </>
  );
};

export default Cv;
