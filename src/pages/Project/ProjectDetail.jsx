import React from "react";
import { Link, useParams } from "react-router-dom";
import ProjectData from "../../data/ProjectData";
import Footer from "../../components/Footer/Footer";
import Border from "../../components/Border/Border";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectItem = ProjectData.find((item) => item.id === parseInt(id));

  if (!projectItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }
  return (
    <article>
      <header>
        <h1 className="font-playfair text-3xl lg:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
          {projectItem.title}
        </h1>
        <p className="text-base mb-2">{projectItem.description}</p>
        <p className="text-base mb-2">
          Ngày thực hiện: <span>{projectItem.date}</span>
        </p>
        <Border />
      </header>
      <section>
        <div>
          <div className="shadow rounded-lg dark:bg-neutral-800">
            <img
              src={`/thinhnguyencode/images/${projectItem.imgae}`}
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
                  <p className="pl-5 text-sm">
                    Truy cập trang:{" "}
                    <span className="inline-block max-w-full">
                      <a
                        href={projectItem.linkPage}
                        className="underline text-blue-600 hover:text-blue-800 transition break-all [text-decoration-skip-ink:none]"
                      >
                        {projectItem.linkPage}
                      </a>
                    </span>
                  </p>
                </Link>
                <Link
                  to={projectItem.linkPage}
                  className="group block relative rounded-lg mb-2"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                  <p className="pl-5 text-sm">
                    Link github:{" "}
                    <span className="underline text-blue-600 hover:text-blue-800 transition break-all [text-decoration-skip-ink:none]">
                      {projectItem.linkPage}
                    </span>
                  </p>
                </Link>
                <p className="group block relative rounded-lg">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                  <p className="pl-5 text-sm">
                    Ngôn ngữ sử dụng: <span>{projectItem.language}</span>
                  </p>
                </p>
              </div>
              <div className="flex justify-between items-center gap-x-2">
                <div
                  className={`inline-block text-center max-w-max border px-2 rounded-md ${
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
      <Border />
      <p className="mb-4">Những dự án cá nhân mà tớ tự làm</p>
      <Link
        to="/project"
        className="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block"
      >
        Quay lại
      </Link>
      <Footer />
    </article>
  );
};

export default ProjectDetail;
