import { useLayoutEffect } from "react";

const TARGETS = "[data-reveal], .img-reveal";

/**
 * Reveals [data-reveal] and .img-reveal elements once, as they scroll into view.
 * Elements added later (e.g. when the Projects filter swaps tiles) are picked up
 * by a MutationObserver, so nothing is left hidden.
 * Does nothing — content stays visible — for reduced-motion users or browsers
 * without IntersectionObserver. Styles live in portfolio.css (.reveal-ready).
 */
export default function useRevealOnScroll(key) {
  // Layout effect so the hidden state is applied before first paint (no flicker)
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return undefined;

    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0 so tall elements still trigger
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = (root) => {
      if (root.matches?.(TARGETS) && !root.classList.contains("is-visible")) io.observe(root);
      root.querySelectorAll?.(TARGETS).forEach((el) => {
        if (!el.classList.contains("is-visible")) io.observe(el);
      });
    };
    observe(document.body);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => node.nodeType === 1 && observe(node)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [key]);
}
