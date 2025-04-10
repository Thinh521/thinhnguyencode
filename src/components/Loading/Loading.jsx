import React from "react";
import { motion } from "framer-motion";
import "./Loading.css";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="loading-overlay"
    >
      <svg
        className="loader"
        viewBox="0 0 384 384"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="active"
          pathLength="360"
          fill="transparent"
          strokeWidth="32"
          cx="192"
          cy="192"
          r="176"
        ></circle>
        <circle
          className="track"
          pathLength="360"
          fill="transparent"
          strokeWidth="32"
          cx="192"
          cy="192"
          r="176"
        ></circle>
      </svg>
    </motion.div>
  );
};

export default Loading;
