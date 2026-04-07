import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      title="Lên đầu trang"
      className={`fixed bottom-[6.5rem] lg:bottom-[6.8rem] lg:right-14 right-[1.4rem] z-50 p-3 lg:p-4 rounded-full
                  backdrop-blur-[18px] saturate-[1.5]
                  border transition-all duration-300
                  hover:scale-110 active:scale-95
                  shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                  ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}

                  bg-[#ffffffe0] text-[#111111] border-black/10
                  dark:bg-[rgba(10,10,10,0.84)] dark:text-white dark:border-white/10
                `}
    >
      <ArrowUp size={16} className="text-neutral-900 dark:text-white" />
    </button>
  );
}
