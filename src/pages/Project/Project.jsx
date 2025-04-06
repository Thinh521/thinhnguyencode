import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectData from "../../data/ProjectData";
import Footer from "../../components/Footer/Footer";

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
          <h1 className="font-playfair text-2xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Dự án
          </h1>
          <p className="text-gray-800 dark:text-white font-medium">
            Những dự án lập trình cá nhân/pet projects của tớ từ Github
          </p>
          <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        </header>
        <section className="">
          <form class="flex max-w-xs ml-auto mb-4">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-tl-lg rounded-bl-lg block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
              <div key={item.id} className="p-5 shadow mb-5 rounded-lg">
                <Link to={`project-detail/${item.id}`}>
                  <div>
                    <h1 className="text-xl font-medium mb-1">{item.title}</h1>
                    <p className="text-base text-gray-500 font-light mb-3">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center gap-x-2">
                      <div
                        className={`flex border px-2 rounded-md ${
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
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
        <Footer />
      </article>
    </>
  );
};

export default Project;
