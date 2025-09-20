import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PhotoData from "../../data/PhotoData";
import Divider from "../../components/Divider/Divider";

const PhotoDetail = () => {
  const { id } = useParams();
  const photoItem = PhotoData.find((item) => item.id === parseInt(id));

  if (!photoItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }

  return (
    <>
      <article>
        <Header title={photoItem.title} subtitle={photoItem.description} />

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {photoItem.images.map((img) => (
              <img
                key={img}
                src={`/thinhnguyencode/images/${img}`}
                alt={img}
                className="rounded shadow-md"
              />
            ))}
          </div>
        </section>
        <Divider />
        <p className="mb-4">Những bức ảnh do tớ tự chụp</p>
        <Link
          to="/photo"
          className="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block"
        >
          Quay lại
        </Link>
      </article>
    </>
  );
};

export default PhotoDetail;
