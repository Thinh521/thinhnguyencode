import React from "react";
import { Link, useParams } from "react-router-dom";
import ProjectData from "../../data/ProjectData";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectItem = ProjectData.find((item) => item.id === parseInt(id));

  if (!projectItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">
          Không tìm thấy ảnh với ID này!
        </h2>
      </div>
    );
  }
  return (
    <article>
      <header>
        <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          {projectItem.title}
        </h1>
        <p className="text-sm text-gray-500 mb-2">
          Ngày thực hiện: <span>{projectItem.date}</span>
        </p>
        <p className="text-sm text-gray-700 dark:text-white font-medium mb-4">
          {projectItem.description}
        </p>
        <div className="border-t border-dashed border-gray-300 w-auto my-4"></div>
      </header>

      <section>
        <div>
          <div className="shadow rounded-lg">
            <img
              src={`/images/${projectItem.imgae}`}
              className="rounded-lg"
              alt=""
            />
            <div className="p-5">
              <div className="mb-3">
                <Link
                  to={projectItem.linkPage}
                  className="group block relative rounded-lg mb-2"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                  <p className="pl-5 text-sm text-gray-700 dark:text-gray-300">
                    Truy cập trang:{" "}
                    <span className="underline text-blue-600 hover:text-blue-800 transition">
                      {projectItem.linkPage}
                    </span>
                  </p>
                </Link>
                <Link
                  to={projectItem.linkPage}
                  className="group block relative rounded-lg mb-2"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                  <p className="pl-5 text-sm text-gray-700 dark:text-gray-300">
                    Link github:{" "}
                    <span className="underline text-blue-600 hover:text-blue-800 transition">
                      {projectItem.linkPage}
                    </span>
                  </p>
                </Link>
                <p className="group block relative rounded-lg">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                  <p className="pl-5 text-sm text-gray-700 dark:text-gray-300">
                    Ngôn ngữ sử dụng: <span>{projectItem.language}</span>
                  </p>
                </p>
              </div>
              <div className="flex justify-between items-center gap-x-2">
                <div
                  className={`flex border px-2 rounded-md ${
                    projectItem.workPosition.includes("Full Stack")
                      ? "border-green-500"
                      : projectItem.workPosition.includes("Front end")
                      ? "border-yellow-500"
                      : projectItem.workPosition.includes("Back end")
                      ? "border-red-500"
                      : "border-gray-500"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      projectItem.workPosition.includes("Full Stack")
                        ? "text-green-500"
                        : projectItem.workPosition.includes("Front end")
                        ? "text-yellow-500"
                        : projectItem.workPosition.includes("Back end")
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {projectItem.workPosition}
                  </span>
                </div>
                <div className="flex justify-center items-center bg-gray-200 px-2 rounded-md">
                  <span className="text-xs font-medium text-gray-500">
                    {projectItem.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-dashed border-gray-300 w-auto my-4 mt-6"></div>
      <p>Những dự án cá nhân mà tớ tự làm</p>
      <footer className="text-gray-800 dark:text-white space-y-1 mt-10 mb-36">
        <p>Dùng máy tính để có trải nghiệm tốt nhất nhé</p>
        <p>Nguyễn Phúc Thịnh</p>
        <p>© 2025 Nguyễn Phúc Thịnh. All rights reserved!</p>
      </footer>
    </article>
  );
};

export default ProjectDetail;
