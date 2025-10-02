import StorytData from "../../data/StoryData";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const Writing = () => {
  return (
    <article>
      <Header
        title="Câu chuyện"
        subtitle="Những câu chuyện mà mình đã trải qua trong cuộc sống"
      />

      <section>
        <div>
          {StorytData.map((item) => (
            <div
              key={item.id}
              className="group dark:bg-neutral-800/80 bg-white shadow rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 mb-5"
            >
              <Link to={`writing-detail/${item.id}`}>
                <img
                  src={`/thinhnguyencode/images/${item.imgae}`}
                  alt=""
                  className="rounded-lg w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex  items-center mb-2">
                    <div className="flex flex-wrap lg:flex-nowrap">
                      <p className="whitespace-nowrap lg:pe-4 font-bold text-black dark:text-white text-lg">
                        {item.title}
                      </p>
                      <p className="whitespace-nowrap">{item.title_2}</p>
                    </div>
                    <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-full mx-4"></div>
                    <div className="flex flex-wrap lg:flex-nowrap">
                      <strong className="whitespace-nowrap lg:pe-4">
                        Ngày đăng:{" "}
                      </strong>
                      <p className="whitespace-nowrap">{item.date}</p>
                    </div>
                  </div>
                  <p className="line-clamp-3 text-justify mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center">
                    <p className="whitespace-nowrap me-4">
                      <strong>Tác giả:</strong> <span>{item.author}</span>
                    </p>
                    <div className="border-t border-dashed border-gray-400 dark:border-neutral-400 w-full"></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Writing;
