import { useParams } from "react-router-dom";
import StorytData from "../../data/StoryData";
import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";
import { Calendar, Tag, User } from "lucide-react";
import BackButton from "../../components/Button/BackButton";

const WritingDetail = () => {
  const { id } = useParams();
  const story = StorytData.find((item) => item.id === parseInt(id));

  return (
    <>
      <article>
        <StickyHeader title={story.title} />

        <Header
          title={story.title}
          subtitle="Những câu chuyện mà mình đã trải qua trong cuộc sống"
        />

        <section className="mb-5">
          <div>
            <div className="mb-4">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 px-4 py-2 rounded-full shadow-sm">
                  <User
                    size={16}
                    className="text-sm text-gray-700 dark:text-white"
                  />
                  <span className="text-xs text-gray-700 dark:text-white font-medium">
                    {story.author}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 px-4 py-2 rounded-full shadow-sm">
                  <Calendar
                    size={16}
                    className="text-sm text-gray-700 dark:text-white"
                  />
                  <span className="text-xs text-gray-700 dark:text-white">
                    {story.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 px-4 py-2 rounded-full shadow-sm">
                  <Tag
                    size={16}
                    className="text-sm text-gray-700 dark:text-white"
                  />
                  <span className="text-xs text-gray-700 dark:text-white">
                    {story.title_2}
                  </span>
                </div>
              </div>
            </div>
            <img
              src={story.imgae}
              alt="writing"
              className="rounded-lg w-full h-60 object-cover mb-4 shadow-md"
            />
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-50 mb-2">
                {story.title}
              </p>
              <p className="text-sm text-justify leading-relaxed">
                {story.description}
              </p>
            </div>
          </div>
        </section>

        <Divider />

        <BackButton className="mt-5 mb-10" />
      </article>
    </>
  );
};

export default WritingDetail;
