import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const detailRoutes = ["/photos/", "/projects/", "/writing/"];

    const shouldScroll = detailRoutes.some(
      (route) => pathname.startsWith(route) && pathname !== route
    );

    if (shouldScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
