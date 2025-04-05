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
import { Link } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { to: "/", title: "Home", icon: <HomeIcon /> },
  { to: "about", title: "About", icon: <UserIcon /> },
  { to: "project", title: "Project", icon: <ProjectIcon /> },
  { to: "library", title: "Library", icon: <LibraryIcon /> },
  { to: "photo", title: "Photo", icon: <PhotoIcon /> },
  { to: "music", title: "Music", icon: <MusicIcon /> },
  { to: "writing", title: "Writing", icon: <WritingIcon /> },
  { to: "contact", title: "Contact", icon: <ContactIcon /> },
];

const Navbar = () => {
  return (
    <nav className="fixed rounded-xl bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-900 border border-gray-700 p-4 shadow-md z-50">
      <ul className="flex items-center justify-center gap-x-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="nav-item flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:scale-105 dark:bg-gray-700"
            >
              <div
                className="flex items-center justify-center p-2 cursor-pointer rounded-md text-neutral-500 hover:text-neutral-100 font-medium relative z-[9999999999] 
              data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mb-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible 
              data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-bottom data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible 
              hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all 
              data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:bottom-[calc(100%+4px)] 
              data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 
              data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md 
              data-[tooltip]:after:drop-shadow data-[tooltip]:before:mb-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center 
              data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible 
              data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 
              data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white 
              data-[tooltip]:before:[clip-path:polygon(50%_100%,0_0,100%_0)] 
              data-[tooltip]:before:absolute data-[tooltip]:before:bottom-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 
              data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                data-tooltip={item.title}
              >
                {item.icon}
              </div>
            </Link>
          </li>
        ))}
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
