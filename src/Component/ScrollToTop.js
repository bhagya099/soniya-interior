import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Start each page at the top. Keyed on pathname only, so query-string changes
// (the Projects room filter) don't jump the page. "instant" overrides the
// smooth scroll-behavior set on <html>.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
