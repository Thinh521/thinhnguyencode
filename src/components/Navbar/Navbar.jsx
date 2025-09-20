import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import Loading from "../../components/Loading/Loading";

const navItems = [
  { to: "/", title: "Home", icon: HomeIcon },
  { to: "/about", title: "About", icon: UserIcon },
  { to: "/project", title: "Project", icon: ProjectIcon },
  { to: "/education", title: "Education", icon: EducationIcon },
  { to: "/photo", title: "Photo", icon: PhotoIcon },
  { to: "/music", title: "Music", icon: MusicIcon },
  { to: "/writing", title: "Writing", icon: WritingIcon },
  { to: "/contact", title: "Contact", icon: ContactIcon },
];

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loadingItem, setLoadingItem] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (initialHeight - currentHeight > 150) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      setIsMounted(false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (to) => {
    if (location.pathname !== to) {
      setLoadingItem(to);
      setTimeout(() => {
        navigate(to);
        setLoadingItem(null);
      }, 300);
    }
  };

  if (!showNavbar) return null;

  return (
    <nav
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 
                  rounded-xl backdrop-blur-md border border-gray-200 dark:border-neutral-700 p-3 shadow-md 
                  z-40 max-w-[calc(90vw)] overflow-x-auto transition-all duration-500 ease-out hide-scrollbar
                  ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
    >
      <ul className="flex items-center justify-center gap-3 w-max mx-auto px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const isLoading = loadingItem === item.to;
          const IconComponent = item.icon;

          return (
            <li key={item.to} className="flex-shrink-0 relative">
              <NavLink
                to={item.to}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.to);
                }}
                className={`
                            w-11 h-11 flex items-center justify-center rounded-lg p-2
                            transition-all duration-300 shadow-md
                            ${
                              isActive
                                ? "bg-gray-300 dark:bg-neutral-300 scale-110"
                                : "bg-gray-200 dark:bg-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-600 hover:scale-105 active:scale-95"
                            }
                          `}
                aria-label={item.title}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center justify-center cursor-pointer">
                  {isLoading ? (
                    <Loading size="small" />
                  ) : (
                    <IconComponent
                      className={`transition-colors duration-300
                                  ${
                                    isActive
                                      ? "text-gray-800 dark:text-neutral-800"
                                      : "text-gray-600 dark:text-neutral-400"
                                  }
                                `}
                    />
                  )}
                </div>

                {/* Indicator mượt */}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-[-0.4rem] w-4 h-1 rounded-full bg-gray-500 dark:bg-neutral-50"
                    initial={false}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
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
