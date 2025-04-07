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
            Những dự án lập trình cá nhân/pet projects của tôi từ Github
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
                className="dark:bg-neutral-800 p-5 shadow mb-5 rounded-lg"
              >
                <Link to={`project-detail/${item.id}`}>
                  <div>
                    <h1 className="text-xl font-medium mb-1">{item.title}</h1>
                    <p className="text-base mb-3">{item.description}</p>
                    <div className="flex justify-between items-center gap-x-2">
                      <div
                        className={`inline-block text-center max-w-max border px-2 rounded-md ${
                          item.workPosition.includes("Full Stack")
                            ? "border-green-500"
                            : item.workPosition.includes("Front end")
                            ? "border-yellow-500"
                            : item.workPosition.includes("Back end")
                            ? "border-red-500"
                            : "border-gray-500"
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            item.workPosition.includes("Full Stack")
                              ? "text-green-500"
                              : item.workPosition.includes("Front end")
                              ? "text-yellow-500"
                              : item.workPosition.includes("Back end")
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {item.workPosition}
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-gray-200 px-2 rounded-md">
                        <span className="text-xs font-medium text-gray-500">
                          {item.date}
                        </span>
                      </div>
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
