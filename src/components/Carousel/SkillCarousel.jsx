"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGES } from "../../../public/images/imgaes";

const people = [
  {
    id: 1,
    name: "React JS",
    role: "Theoretical Physicist",
    email: "einstein@example.com",
    profile: IMAGES.React,
  },
  {
    id: 2,
    name: "Tailwind CSS",
    role: "Physicist & Mathematician",
    email: "newton@example.com",
    profile: IMAGES.TailwindCSS,
  },
  {
    id: 3,
    name: "Bootstrap",
    role: "Physicist & Chemist",
    email: "curie@example.com",
    profile: IMAGES.Bootstrap,
  },
  {
    id: 4,
    name: "Github",
    role: "Inventor & Engineer",
    email: "tesla@example.com",
    profile: IMAGES.Github,
  },
  {
    id: 5,
    name: "VS Code",
    role: "Physicist & Mathematician",
    email: "newton@example.com",
    profile: IMAGES.Vscode,
  },
  {
    id: 6,
    name: "JavaScript",
    role: "Astronomer & Physicist",
    email: "galileo@example.com",
    profile: IMAGES.JavaScript,
  },
  {
    id: 7,
    name: "React Native",
    role: "Theoretical Physicist",
    email: "hawking@example.com",
    profile: IMAGES.React,
  },
  {
    id: 8,
    name: "Postman",
    role: "Theoretical Physicist",
    email: "feynman@example.com",
    profile: IMAGES.Postman,
  },
];
const safeImage = (e) => {
  const target = e.target;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};

export default function SkillCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();
  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 50 : 70;
  const containerSize = containerRadius * 2 + 100;
  const getRotation = React.useCallback(
    (index) => (index - activeIndex) * (360 / people.length),
    [activeIndex]
  );

  const next = () => setActiveIndex((i) => (i + 1) % people.length);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + people.length) % people.length);

  const handleProfileClick = React.useCallback(
    (index) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 relative min-h-[400px]transition-colors duration-300">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        <div
          className="absolute rounded-full border border-gray-300 dark:border-gray-700"
          style={{
            width: containerRadius * 2,
            height: containerRadius * 2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={people[activeIndex].id}
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="z-10 bg-white dark:bg-neutral-800 backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-3 md:p-4 w-44 md:w-48 text-center border border-gray-100 dark:border-gray-800"
          >
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              src={people[activeIndex].profile}
              alt={people[activeIndex].name}
              onError={safeImage}
              className="w-14 h-1w-14 md:w-20 md:h-20 p-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50  rounded-full mx-auto -mt-10 md:-mt-12 object-cover shadow-md"
            />
            <motion.div
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
              }}
            >
              <h2 className="mt-2 text-base md:text-lg font-bold text-gray-800 dark:text-white">
                {people[activeIndex].name}
              </h2>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
              className="flex justify-center items-center mt-3 space-x-2"
            >
              <button
                onClick={prev}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
              <button className="px-4 py-1 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                Kết nối
              </button>
              <button
                onClick={next}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight
                  size={16}
                  className="text-gray-700 dark:text-gray-300"
                />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {people.map((p, i) => {
          const rotation = getRotation(i);
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
              }}
            >
              {}
              <motion.div
                animate={{
                  rotate: -rotation,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="w-full h-full"
              >
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`w-full h-full p-2 bg-white dark:bg-neutral-800 object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    i === activeIndex
                      ? "border-4 border-indigo-500 dark:border-indigo-400 shadow-lg"
                      : "border border-gray-200 dark:border-neutral-700/50 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
