import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "about" },
  { label: "Projects", ariaLabel: "Learn projects us", link: "projects" },
  { label: "Timeline", ariaLabel: "Learn timeline us", link: "timeline" },
  { label: "Photos", ariaLabel: "View our photos", link: "photos" },
  { label: "Writing", ariaLabel: "View our writing", link: "writing" },
  { label: "Contact", ariaLabel: "Get in totuch", link: "contact" },
  { label: "Ratings", ariaLabel: "Get in touch", link: "ratings" },
];

const CustomerLayout = () => {
  return (
    <div className="min-h-screen text-neutral-600 dark:text-neutral-400 lg:px-[14rem] px-[1.4rem]">
      <div>
        <Header
          position="right"
          items={menuItems}
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
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
