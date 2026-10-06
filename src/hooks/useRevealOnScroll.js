import { useLayoutEffect } from "react";

/**
 * Fades each <section>'s content up as it scrolls into view.
 * Re-runs when `key` changes (pass the route path) so new pages are picked up.
 * Does nothing — content stays visible — for reduced-motion users or browsers
 * without IntersectionObserver. Styles live in portfolio.css (.reveal-ready).
 */
export default function useRevealOnScroll(key) {
  // Layout effect so the hidden state is applied before first paint (no flicker)
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0 so very tall sections (e.g. the projects grid) still trigger
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll("section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);
}
