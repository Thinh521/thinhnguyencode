import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const CustomerLayout = () => {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen mx-auto text-gray-600 dark:text-neutral-400 pt-14 lg:pt-20 px-5"
        style={{ maxWidth: "720px" }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default CustomerLayout;
