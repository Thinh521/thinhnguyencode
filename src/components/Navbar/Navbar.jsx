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
    <nav className="fixed rounded-xl bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-100 dark:bg-gray-900 border border-gray-700 p-2 shadow-md z-50 max-w-[calc(100vw-20px)] sm:max-w-[90vw] overflow-x-auto scrollbar-hide scroll-smooth overscroll-x-contain">
      <ul className="flex items-center justify-center gap-x-3 sm:gap-x-4 w-max mx-auto px-4">
        {navItems.map((item, index) => (
          <li key={index} className="flex-shrink-0">
            <Link
              to={item.to}
              className="nav-item flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:scale-105 dark:bg-gray-700"
            >
              <div
                className="flex items-center justify-center p-2 cursor-pointer rounded-md text-neutral-500 hover:text-bodyColor dark:hover:text-bodyColor font-medium relative
            data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mb-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible
            data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-bottom data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible
            hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all
            data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:bottom-[calc(100%+4px)]
            data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5
            data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md
            data-[tooltip]:after:drop-shadow data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px]"
                data-tooltip={item.title}
              >
                {item.icon}
              </div>
            </Link>
          </li>
        ))}
        <li className="flex-shrink-0 ml-2">
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useMemo } from "react";
// import NavbarIcon from "./NavbarIcon";
// import NavbarLabel from "./NavbarLabel";
// import NavbarItem from "./NavbarItem";
// import "./Navbar.css";

// const Navbar = ({
//   items,
//   className = "",
//   spring = { mass: 0.1, stiffness: 150, damping: 12 },
//   magnification = 70,
//   distance = 200,
//   panelHeight = 68,
//   dockHeight = 256,
//   baseItemSize = 50,
// }) => {
//   const mouseX = useMotionValue(Infinity);
//   const isHovered = useMotionValue(0);

//   const maxHeight = useMemo(
//     () => Math.max(dockHeight, magnification + magnification / 2 + 4),
//     [magnification, dockHeight]
//   );
//   const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
//   const height = useSpring(heightRow, spring);

//   if (!items || !Array.isArray(items)) {
//     // Đảm bảo items là mảng trước khi sử dụng .map()
//     return <div>No items to display</div>;
//   }
//   return (
//     <motion.div
//       style={{ height, scrollbarWidth: "none" }}
//       className="dock-outer"
//     >
//       <motion.div
//         onMouseMove={({ pageX }) => {
//           isHovered.set(1);
//           mouseX.set(pageX);
//         }}
//         onMouseLeave={() => {
//           isHovered.set(0);
//           mouseX.set(Infinity);
//         }}
//         className={`dock-panel ${className}`}
//         style={{ height: panelHeight }}
//         role="toolbar"
//         aria-label="Application dock"
//       >
//         {items.map((item, index) => (
//           <NavbarItem
//             key={index}
//             onClick={item.onClick}
//             className={item.className}
//             mouseX={mouseX}
//             spring={spring}
//             distance={distance}
//             magnification={magnification}
//             baseItemSize={baseItemSize}
//           >
//             <NavbarIcon>{item.icon}</NavbarIcon>
//             <NavbarLabel>{item.label}</NavbarLabel>
//           </NavbarItem>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Navbar;
