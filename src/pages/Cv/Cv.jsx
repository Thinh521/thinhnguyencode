import { motion } from "framer-motion";
import { IMAGES } from "../../../public/images/imgaes";
import BackButton from "../../components/Button/BackButton";
import Divider from "../../components/Divider/Divider";
import PageHeader from "../../components/layout/PageHeader";
import StickyHeader from "../../components/Header/StickyHeader";

const Cv = () => {
  return (
    <article>
      <StickyHeader title="Resume cá nhân của tớ cho các nhà tuyển dụng" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <PageHeader
          title="Resume"
          subtitle="Resume cá nhân của tớ cho các nhà tuyển dụng"
        />
      </motion.div>

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
