import { Link } from "react-router-dom";
import { User } from "lucide-react";
import StorytData from "../../data/StoryData";
import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";

const Writing = () => {
  return (
    <article>
      <Header
        title="Câu chuyện"
        subtitle="Những câu chuyện mà mình đã trải qua trong cuộc sống"
      />

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {StorytData.map((item, index) => (
            <Link
              key={item.id}
              to={`/writing/${item.id}`}
              className="group block"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="h-full bg-gradient-to-br from-gray-50 via-white to-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-700/50 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-neutral-700 hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-2">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={item.imgae}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-6 lg:p-6">
                  <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {item.title_2 && (
                    <p className="text-sm mb-3 line-clamp-1">{item.title_2}</p>
                  )}

                  <p className="text-sm line-clamp-3 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <Divider />

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-black dark:text-white" />
                      <span className="text-sm font-medium text-black dark:text-white">
                        {item.author}
                      </span>
                    </div>

                    <div className="flex items-center text-blue-600 dark:text-blue-400 transform group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-semibold mr-1">Đọc</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </article>
  );
};

export default Writing;
