import logo from "../assets/logo.png";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { Link, useLocation } from "react-router-dom";
import "./Bubblemenu.css";

const MENU_ITEMS = [
  { label: "Home", href: "/", rotation: -8, hoverBg: "#E30613", hoverColor: "#ffffff" },
  { label: "Services", href: "/#services", rotation: 8, hoverBg: "#111111", hoverColor: "#ffffff" },
  { label: "Work", href: "/work", rotation: 8, hoverBg: "#E30613", hoverColor: "#ffffff" },
  { label: "Pricing", href: "/#pricing", rotation: -8, hoverBg: "#111111", hoverColor: "#ffffff" },
  { label: "Contact", href: "/#contact", rotation: 8, hoverBg: "#E30613", hoverColor: "#ffffff" },
];

const MENU_ID = "primary-navigation";

export default function Bubblemenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const handleToggle = () => setIsMenuOpen(prev => !prev);

  /** Marks the entry matching the current route so users know where they are. */
  const isActive = item => {
    if (item.href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === item.href.slice(1);
    }
    return location.pathname === item.href && !location.hash;
  };

  // ---------------------------------------------------------------- animation
  // The overlay stays mounted and is shown/hidden via GSAP so the closing
  // animation can actually play. Conditional rendering used to unmount the
  // element on the same tick, so the exit tween never ran.
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.killTweensOf([overlay, ...bubbles, ...labels]);

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });

      if (prefersReducedMotion) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(bubbles, { scale: 1, autoAlpha: 1 });
        gsap.set(labels, { y: 0, autoAlpha: 1 });
        return;
      }

      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const tl = gsap.timeline({ delay: i * 0.07 });
        tl.to(bubble, { scale: 1, duration: 0.45, ease: "back.out(1.5)" });
        if (labels[i]) {
          tl.to(labels[i], { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, "-=0.35");
        }
      });
      return;
    }

    // Closing
    const hide = () => gsap.set(overlay, { display: "none" });

    if (prefersReducedMotion) {
      hide();
      return;
    }

    gsap.to(labels, { y: 12, autoAlpha: 0, duration: 0.15, ease: "power3.in" });
    gsap.to(bubbles, { scale: 0, duration: 0.2, ease: "power3.in" });
    gsap.to(overlay, { autoAlpha: 0, duration: 0.25, delay: 0.05, onComplete: hide });
  }, [isMenuOpen]);

  // ------------------------------------------------------------ close on Esc
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = e => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, closeMenu]);

  // ------------------------------------------------------- lock body scroll
  // Without this the page scrolls behind the open overlay on touch devices.
  useEffect(() => {
    if (!isMenuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    // Compensate for the removed scrollbar so the layout doesn't jump.
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isMenuOpen]);

  // ---------------------------------------------------------- focus handling
  // Move focus into the menu on open, keep Tab cycling inside it, and hand
  // focus back to the toggle on close.
  useEffect(() => {
    if (!isMenuOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const firstLink = bubblesRef.current.find(Boolean);
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = e => {
      if (e.key !== "Tab") return;

      const focusable = bubblesRef.current.filter(Boolean);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Clicking a menu link already closes the menu. This covers the remaining
  // case: using browser back/forward while the menu is open, which would
  // otherwise leave the overlay covering the page you navigated to.
  useEffect(() => {
    const onPopState = () => setIsMenuOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <>
      <nav className="bubble-menu absolute" aria-label="Main">
        <Link to="/" className="bubble logo-bubble" aria-label="Tech Yantra — home">
          <img src={logo} alt="" width="42" height="42" className="logo-image" />
          <span className="logo-text">
            <span className="logo-title">TECH YANTRA</span>
            <span className="logo-subtitle">Software Agency</span>
          </span>
        </Link>

        <button
          type="button"
          ref={toggleRef}
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls={MENU_ID}
        >
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
      </nav>

      <div
        ref={overlayRef}
        id={MENU_ID}
        className="bubble-menu-items"
        // Clicking the backdrop dismisses the menu, matching the Esc affordance.
        onClick={e => {
          if (e.target === overlayRef.current) closeMenu();
        }}
      >
        <div className="bubble-menu-panel" ref={panelRef}>
          <ul className="pill-list">
            {MENU_ITEMS.map((item, idx) => (
              <li key={item.href} className="pill-col">
                <Link
                  to={item.href}
                  className={`pill-link ${isActive(item) ? "is-active" : ""}`}
                  style={{
                    "--item-rot": `${item.rotation}deg`,
                    "--hover-bg": item.hoverBg,
                    "--hover-color": item.hoverColor,
                  }}
                  aria-current={isActive(item) ? "page" : undefined}
                  ref={el => (bubblesRef.current[idx] = el)}
                  onClick={closeMenu}
                >
                  <span className="pill-label" ref={el => (labelRefs.current[idx] = el)}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
