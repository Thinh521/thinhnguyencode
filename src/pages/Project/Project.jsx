import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectData from "../../data/ProjectData";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const Project = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = ProjectData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.workPosition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <article>
        <header>
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Dự án
          </h1>
          <p className="text-base">
            Những dự án lập trình cá nhân/pet projects của tớ từ Github
          </p>
          <Border />
        </header>
        <section className="">
          <form class="flex max-w-xs ml-auto my-5">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-400 text-gray-600 text-sm rounded-tl-lg rounded-bl-lg block w-full ps-4 p-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-neutral-400"
                placeholder="Tìm kiếm dự án"
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              class="p-3 text-sm font-medium text-white border dark:text-black border-gray-700 bg-gray-700 rounded-tr-lg rounded-br-lg hover:bg-gray-800 focus:ring-gray-300 dark:bg-white dark:hover:bg-gray-200"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>
          <div>
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className="group dark:bg-neutral-800/80 bg-white p-6 shadow mb-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600"
              >
                <Link to={`project-detail/${item.id}`} className="block">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
                      {item.title}
                    </h3>

                    <div className="relative">
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium ${
                          item.workPosition.includes("Full Stack")
                            ? "bg-green-100 text-green-800  dark:bg-green-900/30 dark:text-green-400"
                            : item.workPosition.includes("Front end")
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : item.workPosition.includes("Back end")
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.workPosition}
                      </span>

                      {/* Date */}
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {item.date}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg text-sm font-medium 0 hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors duration-200">
                        Xem chi tiết
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-4 w-4  transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
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

export default Project;
