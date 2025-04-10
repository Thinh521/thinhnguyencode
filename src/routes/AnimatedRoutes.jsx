import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -50,
  },
};

const pageTransition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
  duration: 0.3,
};

export const AnimatedRoutes = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname.split("/")[1] || "home"}
      >
        {children}
      </Routes>
    </AnimatePresence>
  );
};

export const PageAnimation = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);
