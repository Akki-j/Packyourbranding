import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "../types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container navbar">
        <Link to="/" className="logo" aria-label="Pack Your Branding home">
          <div className="logo-icon">
            <img src="/assets/logo1.png" alt="Pack Your Branding logo" />
          </div>
          <div className="logo-text">
            <h2>Pack Your Branding</h2>
            <span>Packaging That Makes Your Brand Unforgettable</span>
          </div>
        </Link>

        <nav>
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="nav-btn desktop-nav-btn">
          Get Quote
        </Link>

        <button
          ref={toggleRef}
          className={`hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        ref={menuRef}
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
      >
        <div className="mobile-menu-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link${location.pathname === link.path ? " active" : ""}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mobile-nav-btn"
            onClick={closeMenu}
          >
            Get Quote
          </Link>
        </div>
      </div>

      <div
        className={`mobile-overlay${mobileOpen ? " open" : ""}`}
        onClick={closeMenu}
      />
    </header>
    </>
  );
}
