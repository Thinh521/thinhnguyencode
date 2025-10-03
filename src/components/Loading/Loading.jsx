import { motion } from "framer-motion";
import "./Loading.css";

const Loading = ({ color }) => {
  const strokeColor = color || "var(--active)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loader-container"
    >
      <svg
        className="loader"
        viewBox="0 0 384 384"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="track"
          pathLength="360"
          fill="transparent"
          stroke="#eaeaea"
          strokeWidth="32"
          cx="192"
          cy="192"
          r="176"
        />
        <circle
          className="active"
          pathLength="360"
          fill="transparent"
          stroke={strokeColor}
          strokeWidth="32"
          cx="192"
          cy="192"
          r="176"
        />
      </svg>
    </motion.div>
  );
};

export default Loading;
