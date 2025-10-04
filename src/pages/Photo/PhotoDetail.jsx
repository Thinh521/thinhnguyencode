import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PhotoData from "../../data/PhotoData";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";

const PhotoDetail = () => {
  const { id } = useParams();
  const photo = PhotoData.find((item) => item.id === parseInt(id));

  if (!photo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Không tìm thấy dự án</h2>
      </div>
    );
  }

  return (
    <>
      <article>
        <StickyHeader title={photo.title} />

        <Header title={photo.title} subtitle={photo.description} />

        <section className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {photo.images.map((img) => (
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
      </article>
    </>
  );
};

export default PhotoDetail;
