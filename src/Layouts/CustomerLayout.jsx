import { Outlet, useLocation } from "react-router-dom";
import Navbar, { StaggeredMenu } from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "about" },
  { label: "Projects", ariaLabel: "Learn projects us", link: "projects" },
  { label: "Timeline", ariaLabel: "Learn timeline us", link: "timeline" },
  { label: "Education", ariaLabel: "Learn education us", link: "education" },
  { label: "Photos", ariaLabel: "View our photos", link: "photos" },
  { label: "Writing", ariaLabel: "View our writing", link: "writing" },
  { label: "Contact", ariaLabel: "Get in totuch", link: "contact" },
  { label: "Ratings", ariaLabel: "Get in touch", link: "ratings" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const CustomerLayout = () => {
  return (
    <div className="min-h-screen text-gray-600 dark:text-neutral-400 lg:px-[4rem] px-[1.4rem]">
      <div>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#5227FF"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div>
      <main className="pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
