import { IMAGES } from "../../../public/images/imgaes";
import BackButton from "../../components/Button/BackButton";
import Divider from "../../components/Divider/Divider";

const Cv = () => {
  return (
    <article className="lg:px-[14rem] px-[1.4rem]">
      <section className="px-0 md:px-12 lg:px-32">
        <img
          src={IMAGES.resume1}
          alt="resume"
          className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 mb-2"
        />
        <img
          src={IMAGES.resume2}
          alt="resume"
          className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50"
        />
      </section>

      <Divider className="mt-10" />
      <BackButton className="mt-5 mb-10" />
    </article>
  );
};

export default Cv;
