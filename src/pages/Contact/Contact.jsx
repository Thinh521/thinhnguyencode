import React from "react";

const Contact = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Liên hệ
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Mọi người hãy liên hệ với tớ qua form này nhé.
          </p>
          <div className="border-t border-gray-300 w-auto my-4"></div>
        </header>
        <section>
          <div class="flex flex-col md:ml-auto w-full">
            <div className="flex">
              <div class="relative w-1/2 mb-4 mr-4">
                <label for="name" class="leading-7 text-sm text-gray-600">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative w-1/2 mb-4">
                <label for="phone" class="leading-7 text-sm text-gray-600">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Gửi
            </button>
          </div>
        </section>
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

export default Contact;
