import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../Layouts/CustomerLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Library from "../pages/Library/Library";
import Photo from "../pages/Photo/Photo";
import Music from "../pages/Music/Music";
import Writing from "../pages/Writing/Writing";
import Contact from "../pages/Contact/Contact";
import PhotoDetail from "../pages/Photo/PhotoDetail";
import ProjectDetail from "../pages/Project/ProjectDetail";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="project" element={<Project />} />
        <Route path="project/project-detail/:id" element={<ProjectDetail />} />
        <Route path="library" element={<Library />} />
        <Route path="photo" element={<Photo />} />
        <Route path="photo/photo-detail/:id" element={<PhotoDetail />} />
        <Route path="music" element={<Music />} />
        <Route path="writing" element={<Writing />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
