import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StickyHeader = ({
  title = "",
  showOnScroll = true,
  scrollOffset = 50,
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    if (!showOnScroll) {
      setVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > scrollOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnScroll, scrollOffset]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#1a1a1d]/80 backdrop-blur-sm shadow-sm transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="w-full mx-auto flex items-center justify-between gap-4 py-4 px-4">
        <button
          onClick={handleGoBack}
          className="flex-shrink-0 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 dark:hover:text-neutral-200 hover:text-gray-800 hover:border-gray-800 duration-200 rounded-full p-2 text-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <p className="flex-1 text-sm font-semibold text-gray-900 dark:text-gray-100 truncate text-left">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StickyHeader;
