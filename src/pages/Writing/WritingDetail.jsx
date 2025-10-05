import { useParams } from "react-router-dom";
import StorytData from "../../data/StoryData";
import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";

const WritingDetail = () => {
  const { id } = useParams();
  const story = StorytData.find((item) => item.id === parseInt(id));

  return (
    <>
      <article>
        <StickyHeader title={story.title} />

        <Header title={story.title} subtitle={story.date} />

        <section className="mb-5">
          <div>
            <div className="mb-4">
              <p className="whitespace-nowrap">
                <strong className="text-black dark:text-white font-bold">
                  Tác giả:
                </strong>{" "}
                <span>{story.author}</span>
              </p>
              <p className="whitespace-nowrap">
                <strong className="text-black dark:text-white font-bold">
                  Mô tả:
                </strong>{" "}
                <span>{story.title_2}</span>
              </p>
            </div>
            <img
              src={story.imgae}
              alt="writing"
              className="rounded-lg w-full h-60 object-cover mb-4 shadow-md"
            />
            <p className="text-sm text-justify leading-relaxed">{story.description}</p>
          </div>
        </section>

        <Divider />
      </article>
    </>
  );
};

export default WritingDetail;
