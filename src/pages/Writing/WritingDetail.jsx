import { Link, useParams } from "react-router-dom";
import StorytData from "../../data/StoryData";
import Header from "../../components/Header/Header";
import Divider from "../../components/Divider/Divider";

const WritingDetail = () => {
  const { id } = useParams();
  const storyItem = StorytData.find((item) => item.id === parseInt(id));
  return (
    <>
      <article>
        <Header title={storyItem.title} subtitle={storyItem.date} />

        <section>
          <div>
            <div className="mb-4">
              <p className="whitespace-nowrap">
                <strong>Tác giả:</strong> <span>{storyItem.author}</span>
              </p>
              <p className="whitespace-nowrap">
                <strong>Mô tả:</strong> <span>{storyItem.title_2}</span>
              </p>
            </div>
            <img
              src={`/thinhnguyencode/images/${storyItem.imgae}`}
              alt=""
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <p className="text-justify">{storyItem.description}</p>
          </div>
        </section>

        <Divider />

        <p className="mb-4">Những câu chuyện của tớ</p>

        <Link
          to="/writing"
          className="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block"
        >
          Quay lại
        </Link>
      </article>
    </>
  );
};

export default WritingDetail;
