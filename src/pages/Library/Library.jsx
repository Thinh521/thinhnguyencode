import React from "react";

const Library = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Học vấn
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Trình độ học vấn của tôi
          </p>
          <div className="border-t border-gray-300 w-auto my-4"></div>
        </header>
        <section></section>
        <div className="border-t border-gray-300 w-auto my-4"></div>
        <footer className="text-gray-800 dark:text-white space-y-1 mt-4">
          <p>Dùng máy tính để có trải nghiệm tốt nhất nhé</p>
          <p>Nguyễn Phúc Thịnh</p>
          <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
        </footer>
      </article>
    </>
  );
};

export default Library;
