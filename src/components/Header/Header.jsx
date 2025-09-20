import React from "react";
import Divider from "../Divider/Divider";

const Header = ({ title, subtitle }) => {
  return (
    <>
      <header className="text-center mb-5">
        <h1 className="font-playfair text-3xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight text-left">
          {title}
        </h1>
        <p className="text-sm text-left text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      </header>

      <section className="mb-5">
        <Divider />
      </section>
    </>
  );
};

export default Header;
