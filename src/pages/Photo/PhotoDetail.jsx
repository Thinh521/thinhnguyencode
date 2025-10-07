import {  useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import PhotoData from "../../data/PhotoData";
import Divider from "../../components/Divider/Divider";
import StickyHeader from "../../components/Header/StickyHeader";
import BackButton from "../../components/Button/BackButton";

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

        <div className="mb-5 text-right">
          <h2 className=" text-xl font-bold text-black dark:text-white">
            Bộ sưu tập ảnh
          </h2>
          <p className=" mt-1 text-sm text-gray-600 dark:text-gray-300">
            {photo.images.length} ảnh trong bộ sưu tập này
          </p>
        </div>

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

        <BackButton className="mt-5" />
      </article>
    </>
  );
};

export default PhotoDetail;
