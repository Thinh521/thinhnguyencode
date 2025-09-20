import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const Cv = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBackLink = () => {
    if (location.state?.from === "about") {
      return "/about";
    }
    return "/";
  };

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(getBackLink());
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <article>
        <Header
          title="Resume"
          subtitle="Resume cá nhân của tớ cho các nhà tuyển dụng"
        />
        
        <section className="mb-4">
          <img
            src="/thinhnguyencode/images/resume_1.jpg"
            alt=""
            className="border border-neutral-400 mb-2"
          />
          <img
            src="/thinhnguyencode/images/resume_2.jpg"
            alt=""
            className="border border-neutral-400"
          />
        </section>
        <p className="mb-4">Resume cá nhân của tớ</p>
        <div className="border-t border-dashed border-gray-300 dark:border-neutral-400 w-auto my-4"></div>

        <button
          onClick={handleGoBack}
          className="border border-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-lg px-4 py-1 text-center inline-block"
        >
          Quay lại
        </button>
      </article>
    </>
  );
};

export default Cv;
