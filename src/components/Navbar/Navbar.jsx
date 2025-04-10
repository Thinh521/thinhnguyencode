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
  const [loadingItem, setLoadingItem] = useState(null); // mục đang loading
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (loadingItem) {
      const timeout = setTimeout(() => {
        navigate(loadingItem);
        setLoadingItem(null);
      }, 600); // delay chuyển trang

      return () => clearTimeout(timeout);
    }
  }, [loadingItem, navigate]);

  const handleNavigation = (to) => {
    if (location.pathname !== to) {
      setLoadingItem(to);
    }
  };

  return (
    <nav
      className={`fixed rounded-xl bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 p-3 shadow-md z-40 max-w-[calc(100vw-20px)] sm:max-w-[90vw] overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain transition-all duration-700 ease-out ${
        isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <ul className="flex items-center justify-center gap-x-3 sm:gap-x-4 w-max mx-auto px-1">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          const isLoading = loadingItem === item.to;

          return (
            <li key={index} className="flex-shrink-0 relative">
              <NavLink
                to={isActive ? "#" : item.to}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isActive) {
                    handleNavigation(item.to);
                  }
                }}
                className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 shadow-md bg-gray-200 dark:bg-neutral-700 px-3 py-2 hover:scale-105 active:scale-95 ${
                  isActive || isLoading
                    ? "bg-gray-300 dark:bg-neutral-200 scale-110"
                    : ""
                }`}
                aria-label={item.title}
              >
                <div className="flex items-center justify-center cursor-pointer">
                  {isLoading ? <Loading /> : item.icon}
                </div>
                <span
                  className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive || isLoading
                      ? "bg-gray-500 dark:bg-neutral-400 opacity-100"
                      : "opacity-0"
                  }`}
                />
              </NavLink>
            </li>
          );
        })}
        <li className="flex-shrink-0">
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
