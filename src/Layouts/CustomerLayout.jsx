import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const CustomerLayout = () => {
  return (
    <div
      className="min-h-screen mx-auto text-gray-600 dark:text-neutral-400 pt-14 lg:pt-20 px-4"
      style={{ maxWidth: "720px" }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
