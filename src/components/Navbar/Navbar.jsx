import React, { useEffect, useState } from "react";
import {
  ContactIcon,
  HomeIcon,
  EducationIcon,
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
  { to: "/education", title: "Education", icon: <EducationIcon /> },
  { to: "/photo", title: "Photo", icon: <PhotoIcon /> },
  { to: "/music", title: "Music", icon: <MusicIcon /> },
  { to: "/writing", title: "Writing", icon: <WritingIcon /> },
  { to: "/contact", title: "Contact", icon: <ContactIcon /> },
];

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);

    // Kiểm tra nếu Visual Viewport API được hỗ trợ
    if (!window.visualViewport) return;

    const handleViewportChange = () => {
      // Ngưỡng xác định bàn phím mở (có thể điều chỉnh)
      const threshold = 0.7;
      const isKeyboardShown =
        window.visualViewport.height < window.innerHeight * threshold;

      setIsKeyboardOpen(isKeyboardShown);
    };

    // Thêm event listener
    window.visualViewport.addEventListener("resize", handleViewportChange);

    return () => {
      window.visualViewport.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  return (
    <nav
      className={`fixed rounded-xl bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-neutral-900 border border-gray-400 p-3 shadow-md z-50 max-w-[calc(100vw-20px)] sm:max-w-[90vw] overflow-x-auto scrollbar-hide transition-all duration-500 ease-out ${
        isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${
        isKeyboardOpen ? "translate-y-[calc(100%+1rem)] sm:translate-y-0" : ""
      }`}
    >
      <ul className="flex items-center justify-center gap-x-3 sm:gap-x-3 w-max mx-auto px-1">
        {navItems.map((item, index) => (
          <li key={index} className="flex-shrink-0 relative">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md bg-gray-200
                dark:bg-gray-00 px-3 py-2 hover:scale-105 active:scale-95
                ${isActive ? "bg-gray-300 scale-110" : "dark:bg-neutral-700"}`
              }
              onClick={() => {
                // Khi click vào nav item, đóng bàn phím nếu đang mở
                if (document.activeElement) {
                  document.activeElement.blur();
                }
              }}
            >
              <div className="flex items-center justify-center cursor-pointer">
                {item.icon}
              </div>
              <span
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  location.pathname === item.to
                    ? "bg-gray-300 opacity-100"
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
