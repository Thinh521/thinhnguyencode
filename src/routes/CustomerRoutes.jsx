import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CustomerLayout from "../Layouts/CustomerLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Photo from "../pages/Photo/Photo";
import Music from "../pages/Music/Music";
import Writing from "../pages/Writing/Writing";
import Contact from "../pages/Contact/Contact";
import PhotoDetail from "../pages/Photo/PhotoDetail";
import ProjectDetail from "../pages/Project/ProjectDetail";
import Education from "../pages/Education/Education";
import WritingDetail from "../pages/Writing/WritingDetail";
import Cv from "../pages/Cv/Cv";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const AnimatedRoute = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
  >
    {children}
  </motion.div>
);

const CustomerRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CustomerLayout />}>
          <Route
            index
            element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            }
          />
          <Route
            path="about"
            element={
              <AnimatedRoute>
                <About />
              </AnimatedRoute>
            }
          />
          <Route
            path="project"
            element={
              <AnimatedRoute>
                <Project />
              </AnimatedRoute>
            }
          />
          <Route
            path="project/project-detail/:id"
            element={
              <AnimatedRoute>
                <ProjectDetail />
              </AnimatedRoute>
            }
          />
          <Route
            path="education"
            element={
              <AnimatedRoute>
                <Education />
              </AnimatedRoute>
            }
          />
          <Route
            path="photo"
            element={
              <AnimatedRoute>
                <Photo />
              </AnimatedRoute>
            }
          />
          <Route
            path="photo/photo-detail/:id"
            element={
              <AnimatedRoute>
                <PhotoDetail />
              </AnimatedRoute>
            }
          />
          <Route
            path="music"
            element={
              <AnimatedRoute>
                <Music />
              </AnimatedRoute>
            }
          />
          <Route
            path="writing"
            element={
              <AnimatedRoute>
                <Writing />
              </AnimatedRoute>
            }
          />
          <Route
            path="writing/writing-detail/:id"
            element={
              <AnimatedRoute>
                <WritingDetail />
              </AnimatedRoute>
            }
          />
          <Route
            path="contact"
            element={
              <AnimatedRoute>
                <Contact />
              </AnimatedRoute>
            }
          />
          <Route
            path="cv"
            element={
              <AnimatedRoute>
                <Cv />
              </AnimatedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default CustomerRoutes;
