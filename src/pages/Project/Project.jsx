import Header from "../../components/Header/Header";
import Timeline from "../../components/Experience/Experience";
import Divider from "../../components/Divider/Divider";

const Project = () => {
  return (
    <article>
      <Header
        title="Dự án"
        subtitle="Những dự án lập trình cá nhân / pet projects của mình từ Github"
      />

      <Timeline />

      <Divider className="mb-10" />
    </article>
  );
};

export default Project;
