import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import "./Navbar.css";

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
  const [showNavbar, setShowNavbar] = useState(true); // 👈 thêm state này
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);

    // Chiều cao ban đầu khi không có bàn phím
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;

      // Nếu chiều cao nhỏ hơn ban đầu nhiều => bàn phím có thể đang mở
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

  if (!showNavbar) return null; // 👈 Ẩn hoàn toàn nếu bàn phím đang mở

  return (
    <nav
      className={`navbar-container ${
        isMounted ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <ul className="navbar-list flex items-center justify-center w-max">
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
                className={`navbar-link dark:bg-neutral-700 ${
                  isActive ? "navbar-link-active" : "navbar-link-inactive"
                }`}
                aria-label={item.title}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="navbar-icon-container">
                  {isLoading ? (
                    <Loading size="small" />
                  ) : (
                    <IconComponent
                      className={`navbar-icon ${
                        isActive ? "navbar-icon-active" : "navbar-icon-inactive"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`navbar-indicator ${
                    isActive ? "navbar-indicator-visible" : ""
                  }`}
                />
              </NavLink>
            </li>
          );
        })}
        <li className="navbar-item">
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
