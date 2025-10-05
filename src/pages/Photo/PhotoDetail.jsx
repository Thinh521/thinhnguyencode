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

        <Header
          title={photo.title}
          subtitle="Những bức ảnh mà mình tự chụp qua ống kính nhiệm màu"
        />

        <section className="mb-5">
          <div className="columns-1 sm:columns-2 md:columns-2 gap-4">
            {photo.images.map((img) => (
              <div key={img} className="mb-4 break-inside-avoid">
                <img
                  key={img}
                  src={img}
                  alt={img}
                  className="rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </section>

        <Divider />
      </article>
    </>
  );
};

export default PhotoDetail;
