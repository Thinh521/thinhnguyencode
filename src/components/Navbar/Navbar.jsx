import React from "react";
import {
  ContactIcon,
  HomeIcon,
  LibraryIcon,
  MusicIcon,
  PhotoIcon,
  ProjectIcon,
  UserIcon,
  WritingIcon,
} from "../Icons/Icons";
import DarkModeToggle from "./DarkModeToggle";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { to: "/", title: "Home", icon: <HomeIcon /> },
  { to: "/about", title: "About", icon: <UserIcon /> },
  { to: "/project", title: "Project", icon: <ProjectIcon /> },
  { to: "/library", title: "Library", icon: <LibraryIcon /> },
  { to: "/photo", title: "Photo", icon: <PhotoIcon /> },
  { to: "/music", title: "Music", icon: <MusicIcon /> },
  { to: "/writing", title: "Writing", icon: <WritingIcon /> },
  { to: "/contact", title: "Contact", icon: <ContactIcon /> },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed rounded-xl bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-900 border border-gray-700 p-3 shadow-md z-50 max-w-[calc(100vw-20px)] sm:max-w-[90vw] overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain">
      <ul className="flex items-center justify-center gap-x-3 sm:gap-x-3 w-max mx-auto px-1">
        {navItems.map((item, index) => (
          <li key={index} className="flex-shrink-0 relative">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md bg-gray-200
                dark:bg-gray-700 px-3 py-2 hover:scale-105 active:scale-95
                ${
                  isActive
                    ? "bg-gray-300 text-white dark:text-white scale-110"
                    : "text-neutral-500 dark:bg-gray-700 hover:text-bodyColor dark:hover:text-bodyColor"
                }`
              }
            >
              <div className="flex items-center justify-center cursor-pointer">
                {item.icon}
              </div>
              <span
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  location.pathname === item.to
                    ? "bg-gray-300 dark:bg-blue-400 opacity-100"
                    : "opacity-0"
                }`}
              />
            </NavLink>
          </li>
        ))}
        <li className="flex-shrink-0">
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
