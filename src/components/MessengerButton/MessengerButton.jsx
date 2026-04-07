import { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";

export default function MessengerButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://www.facebook.com/thinh.phuc.nguyen.139470"
      target="_blank"
      rel="noopener noreferrer"
      title="Nhắn Messenger"
      className={`fixed bottom-[6.5rem] lg:bottom-[6.8rem] lg:right-14 right-[1.4rem] z-50 p-[0.74rem] lg:p-4 rounded-full
        backdrop-blur-[18px] saturate-[1.5]
        border transition-all duration-300
        hover:scale-110 active:scale-95
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}

        bg-[#ffffffe0] text-[#111111] border-black/10
        dark:bg-[rgba(10,10,10,0.84)] dark:text-white dark:border-white/10
      `}
    >
      <FaFacebookMessenger
        size={16.5}
        className="text-neutral-900 dark:text-white"
      />
    </a>
  );
}
