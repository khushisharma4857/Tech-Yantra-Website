import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll position on navigation.
 *
 * Two distinct cases:
 *  - Plain route change ("/work")      -> jump to the top of the new page.
 *  - Hash link ("/#services")          -> scroll to that section.
 *
 * The hash case matters because react-router's <Link> does a client-side
 * navigation without triggering the browser's native fragment scrolling, so
 * "/#services" would otherwise just dump the user at the top of the homepage.
 * The target section also may not be mounted on the first frame after a cross
 * page navigation, so we retry on the next animation frame before giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;

    // On a cross-page hash link the target section is not in the DOM yet:
    // AnimatePresence mode="wait" holds the outgoing page for its full exit
    // transition (~500ms) before the incoming page mounts. Poll until the
    // section appears rather than assuming it is there on the next frame.
    const deadline = performance.now() + 3000;

    const scrollToTarget = () => {
      const id = decodeURIComponent(hash.slice(1));
      const target = id ? document.getElementById(id) : null;

      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "instant" : "smooth",
          block: "start",
        });
        return;
      }

      if (performance.now() < deadline) {
        frame = requestAnimationFrame(scrollToTarget);
      }
    };

    frame = requestAnimationFrame(scrollToTarget);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
