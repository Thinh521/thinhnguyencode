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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Loading from "../../components/Loading/Loading";

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
  const [isLoading, setIsLoading] = useState(false);
  const [targetPath, setTargetPath] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading && targetPath) {
      const timeout = setTimeout(() => {
        navigate(targetPath);
        setIsLoading(false);
        setTargetPath(null);
      }, 600); // Thời gian loading trước khi chuyển trang

      return () => clearTimeout(timeout);
    }
  }, [isLoading, targetPath, navigate]);

  const handleNavigation = (to) => {
    if (location.pathname !== to) {
      setIsLoading(true);
      setTargetPath(to); // lưu lại path để chuyển sau loading
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <nav
        className={`fixed rounded-xl bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 p-3 shadow-md z-40 max-w-[calc(100vw-20px)] sm:max-w-[90vw] overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain transition-all duration-700 ease-out ${
          isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <ul className="flex items-center justify-center gap-x-3 sm:gap-x-4 w-max mx-auto px-1">
          {navItems.map((item, index) => (
            <li key={index} className="flex-shrink-0 relative">
              <NavLink
                to={location.pathname === item.to ? "#" : item.to}
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname !== item.to) {
                    handleNavigation(item.to);
                  }
                }}
                className={({ isActive }) =>
                  `w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md bg-gray-200 dark:bg-neutral-700 px-3 py-2 hover:scale-105 active:scale-95 ${
                    isActive || targetPath === item.to
                      ? "bg-gray-300 dark:bg-neutral-600 scale-110"
                      : ""
                  }`
                }
                aria-label={item.title}
              >
                <div className="flex items-center justify-center cursor-pointer">
                  {item.icon}
                </div>
                <span
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                    location.pathname === item.to || targetPath === item.to
                      ? "bg-gray-500 dark:bg-neutral-400 opacity-100"
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
    </>
  );
};

export default Navbar;
