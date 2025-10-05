import { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ loading = true, text = "Grilli" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setIsLoaded(false);
    }
  }, [loading]);

  return (
    <div
      className={`preload bg-white text-black dark:bg-neutral-900 dark:text-white ${
        isLoaded ? "loaded" : ""
      }`}
    >
      <div className="w-12 h-12 relative transform rotate-45 -top-14">
        <div
          className="absolute bg-neutral-900 dark:bg-white w-5 h-5 animate-ping"
          style={{ top: 0, left: 0, animationDuration: "1.2s" }}
        />
        <div
          className="absolute bg-neutral-900 dark:bg-white w-5 h-5 animate-ping"
          style={{
            top: 0,
            right: 0,
            animationDuration: "1.2s",
            animationDelay: "0.15s",
          }}
        />
        <div
          className="absolute bg-neutral-900 dark:bg-white w-5 h-5 animate-ping"
          style={{
            bottom: 0,
            right: 0,
            animationDuration: "1.2s",
            animationDelay: "0.3s",
          }}
        />
        <div
          className="absolute bg-neutral-900 dark:bg-white w-5 h-5 animate-ping"
          style={{
            bottom: 0,
            left: 0,
            animationDuration: "1.2s",
            animationDelay: "0.45s",
          }}
        />
      </div>
      <p className="text">{text}</p>
    </div>
  );
};

export default Preloader;
