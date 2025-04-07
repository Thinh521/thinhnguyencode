import React from "react";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../components/Icons/Icons";

const socialLinks = [
  { Icon: FacebookIcon, link: "https://facebook.com" },
  { Icon: InstagramIcon, link: "https://instagram.com" },
  { Icon: TiktokIcon, link: "https://tiktok.com" },
  { Icon: GithubIcon, link: "https://github.com" },
];

const Contact = () => {
  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Liên hệ
          </h1>
          <p className="dark:text-white font-medium mb-2">
            Mọi người hãy liên hệ với tớ qua form này nhé.
          </p>
          <Border />
        </header>
        <section>
          <div class="flex flex-col md:ml-auto w-full mb-10">
            <div className="flex">
              <div class="relative w-1/2 mb-4 mr-4">
                <label for="name" class="leading-7 text-sm">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative w-1/2 mb-4">
                <label for="phone" class="leading-7 text-sm">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  class="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button class="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block">
              Gửi
            </button>
          </div>
          <div className="flex justify-center items-center">
            <a
              href=""
              className="border max-w-max border-neutral-400 hover:border-gray-800 hover:text-gray-800 dark:hover:text-neutral-200 dark:hover:border-neutral-200 block px-4 py-2 text-base text-gray-600 dark:text-neutral-400 font-medium rounded-lg transition-colors duration-200"
            >
              CV
            </a>
            <div className="border-r border-gray-400 w-1 h-10 mx-4"></div>
            <div className="">
              <ul className="flex space-x-2">
                {socialLinks.map(({ Icon, link }, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      className="block p-2 border border-neutral-400 hover:border-gray-800 dark:hover:border-neutral-200 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200 rounded-lg"
                    >
                      <div className="w-6 h-6">
                        <Icon />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Border />
        <Footer />
      </article>
    </>
  );
};

export default Contact;
