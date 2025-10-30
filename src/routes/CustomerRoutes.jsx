import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../Layouts/CustomerLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Project from "../pages/Project/Project";
import Photo from "../pages/Photo/Photo";
import Writing from "../pages/Writing/Writing";
import Contact from "../pages/Contact/Contact";
import PhotoDetail from "../pages/Photo/PhotoDetail";
import Education from "../pages/Education/Education";
import WritingDetail from "../pages/Writing/WritingDetail";
import Timeline from "../pages/Timeline/Timeline";
import Cv from "../pages/Cv/Cv";
import ProjectDetail from "../pages/Project/ProjectDetail";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Ratings from "../pages/Ratings/Ratings";

const CustomerRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Project />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="education" element={<Education />} />
          <Route path="photos" element={<Photo />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="writing" element={<Writing />} />
          <Route path="/writing/:id" element={<WritingDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="cv" element={<Cv />} />
        </Route>
      </Routes>
    </>
  );
};

export default CustomerRoutes;
