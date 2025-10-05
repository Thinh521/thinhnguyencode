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
                <strong>Tác giả:</strong> <span>{story.author}</span>
              </p>
              <p className="whitespace-nowrap">
                <strong>Mô tả:</strong> <span>{story.title_2}</span>
              </p>
            </div>
            <img
              src={`/thinhnguyencode/images/${story.imgae}`}
              alt=""
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <p className="text-justify">{story.description}</p>
          </div>
        </section>

        <Divider />
      </article>
    </>
  );
};

export default WritingDetail;
