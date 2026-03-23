import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import "./Header.css";
import DarkModeToggle from "./DarkModeToggle";

export const Header = ({
  position = "right",
  colors = ["#1a1a18", "#0d0d0d"],
  items = [],
  socialItems = [],
  displaySocials = true,
  isFixed = true,
  accentColor = "#f97316",
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const location = useLocation();

  /* ── refs ── */
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textAnimRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  /* close on route change */
  React.useEffect(() => {
    if (openRef.current) closeMenu();
  }, [location.pathname]);

  /* ── init GSAP ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preCont = preLayersRef.current;
      if (!panel) return;

      const preLayers = preCont
        ? Array.from(preCont.querySelectorAll(".sm-prelayer"))
        : [];
      preLayerElsRef.current = preLayers;

      const off = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: off });
      gsap.set(plusHRef.current, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusVRef.current, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(iconRef.current, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInnerRef.current, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, [position]);

  /* ── open timeline ── */
  const buildOpen = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const socialEls = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const socTitle = panel.querySelector(".sm-socials-title");

    if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 6 });
    if (socialEls.length) gsap.set(socialEls, { y: 16, opacity: 0 });
    if (socTitle) gsap.set(socTitle, { opacity: 0 });

    const panelStart = Number(gsap.getProperty(panel, "xPercent"));
    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.45, ease: "power4.out" },
        i * 0.055,
      );
    });

    const pInsert = (layerStates.length - 1) * 0.055 + 0.065;
    const pDur = 0.58;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: pDur, ease: "power4.out" },
      pInsert,
    );

    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: { each: 0.08, from: "start" },
        },
        pInsert + pDur * 0.12,
      );
    }

    if (socTitle || socialEls.length) {
      const sStart = pInsert + pDur * 0.38;
      if (socTitle)
        tl.to(
          socTitle,
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          sStart,
        );
      if (socialEls.length)
        tl.to(
          socialEls,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: { each: 0.06 },
            onComplete: () => gsap.set(socialEls, { clearProps: "opacity" }),
          },
          sStart + 0.04,
        );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpen();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpen]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;
    const off = position === "left" ? -100 : 100;
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: off,
      duration: 0.28,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const els = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
        const socs = Array.from(panel.querySelectorAll(".sm-socials-link"));
        const st = panel.querySelector(".sm-socials-title");
        if (els.length) gsap.set(els, { yPercent: 120, rotate: 6 });
        if (socs.length) gsap.set(socs, { y: 16, opacity: 0 });
        if (st) gsap.set(st, { opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  /* icon × animation */
  const animIcon = useCallback((opening) => {
    spinTweenRef.current?.kill();
    if (opening) {
      gsap.set(iconRef.current, { rotate: 0 });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(plusHRef.current, { rotate: 45, duration: 0.4 }, 0)
        .to(plusVRef.current, { rotate: -45, duration: 0.4 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(plusHRef.current, { rotate: 0, duration: 0.3 }, 0)
        .to(plusVRef.current, { rotate: 90, duration: 0.3 }, 0);
    }
  }, []);

  /* text cycle animation */
  const animText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textAnimRef.current?.kill();
    const from = opening ? "Menu" : "Close";
    const to = opening ? "Close" : "Menu";
    const seq = [from];
    let last = from;
    for (let i = 0; i < 3; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== to) seq.push(to);
    seq.push(to);
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    const shift = ((seq.length - 1) / seq.length) * 100;
    textAnimRef.current = gsap.to(inner, {
      yPercent: -shift,
      duration: 0.42 + seq.length * 0.055,
      ease: "power4.out",
    });
  }, []);

  /* toggle + close */
  const toggleMenu = useCallback(() => {
    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);
    if (next) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animIcon(next);
    animText(next);
  }, [playOpen, playClose, animIcon, animText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animIcon(false);
    animText(false);
  }, [playClose, animIcon, animText, onMenuClose]);

  /* click-away — pointerdown capture so it fires before Link navigate */
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handle = (e) => {
      const inPanel = panelRef.current?.contains(e.target);
      const inToggle = toggleBtnRef.current?.contains(e.target);
      if (!inPanel && !inToggle) closeMenu();
    };
    document.addEventListener("pointerdown", handle, { capture: true });
    return () =>
      document.removeEventListener("pointerdown", handle, { capture: true });
  }, [closeOnClickAway, open, closeMenu]);

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div
      className={`sm-scope ${isFixed ? "fixed top-0 left-0 w-full z-50" : "w-full"}`}
    >
      <div
        className="staggered-menu-wrapper pointer-events-none relative w-full h-full"
        style={{ "--sm-accent": accentColor }}
        data-position={position}
        data-open={open || undefined}
      >
        {/* ── Pre-layers ── */}
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          {colors.slice(0, 2).map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ))}
        </div>

        {/* ── HEADER BAR ── */}
        <header className="sm-header" aria-label="Navigation">
          {/* Logo */}
          <Link to="/" className="sm-logo pointer-events-auto">
            <span className="sm-logo-text">
              thinh<span className="sm-logo-dot">.</span>dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="sm-desktop-nav">
            {items.map((it, i) => (
              <Link
                key={i}
                to={it.link}
                className={`sm-nav-link ${location.pathname === it.link ? "active" : ""}`}
              >
                {it.label}
                {location.pathname === it.link && (
                  <span className="sm-nav-dot" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="sm-controls pointer-events-auto">
            {/* DarkMode (desktop only) */}
            <div className="sm-dm-desktop">
              <DarkModeToggle asButton={false} />
            </div>

            {/* Hamburger (mobile only) */}
            <button
              ref={toggleBtnRef}
              className="sm-hamburger pointer-events-auto"
              onClick={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              type="button"
            >
              {/* text cycle */}
              <span className="sm-hbg-text" aria-hidden="true">
                <span ref={textInnerRef} className="sm-hbg-inner">
                  {textLines.map((l, i) => (
                    <span key={i} className="sm-hbg-line">
                      {l}
                    </span>
                  ))}
                </span>
              </span>

              {/* × icon */}
              <span ref={iconRef} className="sm-hbg-icon" aria-hidden="true">
                <span ref={plusHRef} className="sm-hbg-bar" />
                <span ref={plusVRef} className="sm-hbg-bar" />
              </span>
            </button>
          </div>
        </header>

        {/* ── SLIDE PANEL ── */}
        <aside
          id="sm-panel"
          ref={panelRef}
          className="sm-panel"
          aria-hidden={!open}
        >
          {/* Panel header */}
          <div className="sm-panel-head">
            <span className="sm-panel-label">Menu</span>
            <div className="sm-panel-line" />
          </div>

          {/* Nav items */}
          <ul className="sm-panel-list" role="list">
            {items.map((it, i) => (
              <li key={i} className="sm-panel-item-wrap">
                <Link
                  to={it.link}
                  className={`sm-panel-link ${location.pathname === it.link ? "active" : ""}`}
                >
                  <span className="sm-panel-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="sm-panel-itemLabel">{it.label}</span>
                  <span className="sm-panel-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark mode (mobile) */}
          <div className="sm-dm-mobile">
            <DarkModeToggle asButton={true} />
          </div>

          {/* Socials */}
          {displaySocials && socialItems?.length > 0 && (
            <div className="sm-socials">
              <p className="sm-socials-title">Socials</p>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Header;
