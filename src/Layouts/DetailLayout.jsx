import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import StickyHeader from "../components/layout/StickyHeader";

const DetailLayout = () => {
  return (
    <div className="min-h-screen text-neutral-600 dark:text-neutral-400">
      <StickyHeader />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DetailLayout;
