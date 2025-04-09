import React, { useState } from "react";
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
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Hiển thị trạng thái "Đang gửi..."
    setStatus("Đang gửi...");

    try {
      const response = await fetch("https://formspree.io/f/xkgjknda", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
        form.reset();

        // Tự động xóa thông báo sau 3 giây
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } catch (error) {
      setStatus("Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Liên hệ
          </h1>
          <p className="text-base">
            Mọi người hãy liên hệ với tớ qua form này nhé.
          </p>
          <Border />
        </header>

        <section>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:ml-auto w-full mb-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-1/2 mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative w-full md:w-1/2 mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email của bạn
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-300 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nội dung
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full bg-white dark:bg-neutral-800 rounded border border-neutral-400 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 dark:text-gray-300 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>

            {status && (
              <div
                className={`mb-4 p-3 rounded ${
                  status.includes("Cảm ơn")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status}
              </div>
            )}

            <button
              type="submit"
              className="w-full md:w-auto border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-6 py-2 text-center inline-flex items-center justify-center font-medium"
            >
              Gửi tin nhắn
            </button>
          </form>

          <div className="flex flex-col md:flex-row justify-center items-center my-8 gap-4">
            <a
              href="/path-to-your-cv.pdf"
              download
              className="border max-w-max border-neutral-400 hover:border-gray-800 hover:text-gray-800 dark:hover:text-neutral-200 dark:hover:border-neutral-200 block px-4 py-2 text-base text-gray-600 dark:text-neutral-400 font-medium rounded-lg transition-colors duration-200"
            >
              Tải CV của tôi
            </a>

            <div className="border-r border-gray-400 w-10 h-px md:w-px md:h-10 mx-0 md:mx-4"></div>

            <div className="flex space-x-2">
              {socialLinks.map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 border border-neutral-400 hover:border-gray-800 dark:hover:border-neutral-200 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200 rounded-lg"
                >
                  <div className="w-6 h-6">
                    <Icon />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Border />
        <Footer />
      </article>
    </div>
  );
};

export default Contact;
