import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const DETAIL_GROUPS = ["projects", "photos", "writing", "cv"];

    const isDetailPath = (path) =>
      DETAIL_GROUPS.some((group) => new RegExp(`^/${group}/[^/]+`).test(path));

    const wasDetail = isDetailPath(prevPath.current);
    const isBackToList =
      wasDetail &&
      DETAIL_GROUPS.some(
        (group) =>
          prevPath.current.startsWith(`/${group}/`) &&
          pathname.startsWith(`/${group}`) &&
          !isDetailPath(pathname)
      );

    if (!isBackToList) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevPath.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
