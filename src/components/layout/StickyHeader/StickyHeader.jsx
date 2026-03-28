import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StickyHeader = ({ title }) => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 px-[1.4rem] z-50 transition-all duration-500
        ${
          scrolled
            ? "bg-white/80 dark:bg-[#1a1a1d]/80 backdrop-blur-sm shadow-sm"
            : "bg-transparent shadow-none"
        }`}
    >
      <div className="w-full flex items-center justify-between gap-4 py-4">
        <button
          onClick={handleGoBack}
          className="flex-shrink-0 bg-gray-200 dark:bg-neutral-600 hover:dark:bg-neutral-400 hover:bg-gray-300 border border-gray-200 dark:border-neutral-700/50 dark:hover:text-white hover:text-gray-800 hover:border-gray-300 hover:dark:border-neutral-400 duration-200 rounded-full p-2 text-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="font-playfair flex-1 text-xl font-semibold text-gray-900 dark:text-gray-100 truncate text-left">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StickyHeader;
