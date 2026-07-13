import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "./Bubblemenu.css";

const MENU_ITEMS = [
  { label: "Home", href: "/", ariaLabel: "Home", rotation: -8, hoverBg: "#E30613", hoverColor: "#ffffff" },
  { label: "Services", href: "/#services", ariaLabel: "Services", rotation: 8, hoverBg: "#111111", hoverColor: "#ffffff" },
  { label: "Work", href: "/work", ariaLabel: "Work", rotation: 8, hoverBg: "#E30613", hoverColor: "#ffffff" },
  { label: "Pricing", href: "/#pricing", ariaLabel: "Pricing", rotation: -8, hoverBg: "#111111", hoverColor: "#ffffff" },
  { label: "Contact", href: "/#contact", ariaLabel: "Contact", rotation: 8, hoverBg: "#E30613", hoverColor: "#ffffff" },
];

export default function Bubblemenu({ useFixedPosition = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });

      gsap.killTweensOf([...bubbles, ...labels]);

      gsap.set(bubbles, {
        scale: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(labels, {
        y: 24,
        autoAlpha: 0,
      });

      bubbles.forEach((bubble, i) => {
        const delay = i * 0.12 + gsap.utils.random(-0.05, 0.05);

        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
        });

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.45"
          );
        }
      });
    } else {
      gsap.killTweensOf([...bubbles, ...labels]);

      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });

      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen) return;

      const bubbles = bubblesRef.current.filter(Boolean);
      const isDesktop = window.innerWidth >= 900;

      bubbles.forEach((bubble, i) => {
        if (bubble && MENU_ITEMS[i]) {
          gsap.set(bubble, {
            rotation: isDesktop ? MENU_ITEMS[i].rotation : 0,
          });
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <nav className={containerClassName} aria-label="Main navigation">
        <Link to="/" className="bubble logo-bubble" aria-label="Tech Yantra">
          <img
            src={logo}
            alt="Tech Yantra Logo"
            className="logo-image"
          />

          <div className="logo-text">
            <span className="logo-title">TECH YANTRA</span>
            <span className="logo-subtitle">Software Agency</span>
          </div>
        </Link>

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${
            isMenuOpen ? "open" : ""
          }`}
          onClick={handleToggle}
          aria-label="Toggle Menu"
          aria-pressed={isMenuOpen}
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${
            useFixedPosition ? "fixed" : "absolute"
          }`}
        >
          <ul className="pill-list">
            {MENU_ITEMS.map((item, idx) => (
              <li key={idx} className="pill-col">
                <Link
                  to={item.href}
                  className="pill-link"
                  style={{
                    "--item-rot": `${item.rotation}deg`,
                    "--hover-bg": item.hoverBg,
                    "--hover-color": item.hoverColor,
                  }}
                  ref={(el) => (bubblesRef.current[idx] = el)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className="pill-label"
                    ref={(el) => (labelRefs.current[idx] = el)}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}