import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../Layouts/CustomerLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Photo from "../pages/Photo/Photo";
import Music from "../pages/Music/Music";
import Writing from "../pages/Writing/Writing";
import Contact from "../pages/Contact/Contact";
import PhotoDetail from "../pages/Photo/PhotoDetail";
import Education from "../pages/Education/Education";
import WritingDetail from "../pages/Writing/WritingDetail";
import Cv from "../pages/Cv/Cv";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="project" element={<Project />} />
        <Route path="education" element={<Education />} />
        <Route path="photo" element={<Photo />} />
        <Route path="photo/photo-detail/:id" element={<PhotoDetail />} />
        <Route path="music" element={<Music />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/writing-detail/:id" element={<WritingDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cv" element={<Cv />} />
      </Route>
    </Routes>
  );
};

export default CustomerRoutes;
