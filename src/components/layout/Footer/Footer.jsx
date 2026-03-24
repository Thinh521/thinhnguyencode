import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  User,
  ArrowUpRight,
  Github,
  ExternalLink,
  Heart,
} from "lucide-react";
import VisitorCounter from "../../VisitorCounter";
import Divider from "../../Divider/Divider";

/* ─────────────────────────────────────────────
   FONTS + STYLES
───────────────────────────────────────────── */
const FooterStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .f-serif  { font-family: 'Instrument Serif', serif; }
    .f-mono   { font-family: 'JetBrains Mono', monospace; }

    /* Gradient text */
    @keyframes fGradShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    .f-gradient-text {
      background: linear-gradient(135deg, #f97316 0%, #fbbf24 40%, #fb923c 70%, #f97316 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fGradShift 5s ease infinite;
    }

    /* Divider */
    .f-rule {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(249,115,22,0.3), rgba(249,115,22,0.3), transparent);
    }

    /* Contact row */
    .f-contact-row {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 0;
      text-decoration: none;
      transition: padding-left 0.25s ease;
    }
    .f-contact-row:hover { padding-left: 8px; }
    .f-contact-row:last-child { border-bottom: none; }

    .f-contact-icon {
      width: 36px; height: 36px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      border-radius: 10px;
      border: 1px solid rgba(249,115,22,0.2);
      background: rgba(249,115,22,0.08);
      transition: background 0.2s, border-color 0.2s;
    }
    .f-contact-row:hover .f-contact-icon {
      background: rgba(249,115,22,0.16);
      border-color: rgba(249,115,22,0.4);
    }

    /* Bouncing dots */
    @keyframes fDotBounce {
      0%, 80%, 100% { transform: translateY(0) scaleX(1); }
      40%           { transform: translateY(-10px) scaleX(0.9); }
    }
    @keyframes fDotShadow {
      0%, 80%, 100% { transform: scaleX(1.4); opacity: 0.3; }
      40%           { transform: scaleX(0.5); opacity: 0.1; }
    }
    .f-dot { animation: fDotBounce 1s ease-in-out infinite; }
    .f-dot:nth-child(2) { animation-delay: 0.15s; }
    .f-dot:nth-child(3) { animation-delay: 0.3s;  }
    .f-dot-shadow { animation: fDotShadow 1s ease-in-out infinite; }
    .f-dot-shadow:nth-child(2) { animation-delay: 0.15s; }
    .f-dot-shadow:nth-child(3) { animation-delay: 0.3s;  }

    /* Spinning border badge */
    @property --spin-angle {
      syntax: '<angle>'; initial-value: 0deg; inherits: false;
    }
    @keyframes fSpin { to { --spin-angle: 360deg; } }
    .f-spin-border {
      background: conic-gradient(from var(--spin-angle), transparent 30%, #f97316 60%, transparent 75%);
      animation: fSpin 3.5s linear infinite;
    }

    /* Available pulse */
    @keyframes fAvailPulse {
      0%,100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(2); opacity: 0; }
    }
    .f-avail-ring {
      position: absolute; inset: 0; border-radius: 50%;
      background: #4ade80;
      animation: fAvailPulse 2s ease-in-out infinite;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CONTACT = [
  { icon: User, label: "Họ và tên", value: "Nguyễn Phúc Thịnh", href: "#" },
  {
    icon: Phone,
    label: "Điện thoại",
    value: "078 697 9877",
    href: "tel:0786979877",
  },
  {
    icon: Mail,
    label: "Email",
    value: "nguyenphucthinh2005tp@gmail.com",
    href: "mailto:nguyenphucthinh2005tp@gmail.com",
  },
  {
    icon: MapPin,
    label: "Địa chỉ",
    value: "Gò Vấp, TP. Hồ Chí Minh",
    href: "#",
  },
];

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Dự án", href: "/projects" },
  { label: "Hành trình", href: "/timeline" },
  { label: "Ảnh & Tin", href: "/photo" },
  { label: "Câu chuyện", href: "/writing" },
  { label: "Đánh giá", href: "/ratings" },
  { label: "Liên hệ", href: "/contact" },
];

/* ─────────────────────────────────────────────
   BOUNCING DOTS
───────────────────────────────────────────── */
function BouncingDots() {
  return (
    <div
      style={{ position: "relative", width: 52, height: 32, margin: "0 auto" }}
    >
      {/* dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="f-dot"
          style={{
            position: "absolute",
            bottom: 6,
            left: `${15 + i * 35}%`,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#f97316",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      {/* shadows */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="f-dot-shadow"
          style={{
            position: "absolute",
            bottom: 0,
            left: `${15 + i * 35}%`,
            width: 7,
            height: 3,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.25)",
            filter: "blur(1px)",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────────── */
const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "transparent", paddingBottom: "120px" }}
    >
      <FooterStyles />

      <div className="f-rule mb-6" />

      {/* ── HERO QUOTE ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <p
          className="f-serif text-black dark:text-white"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            lineHeight: 1.5,
            maxWidth: "500px",
            margin: "0 auto 12px",
          }}
        >
          "Mã là thơ ca, thiết kế là nghệ thuật —<br />
          cùng nhau tạo nên điều kỳ diệu."
        </p>
        <BouncingDots />
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="px-4 md:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 mb-12">
          {/* LEFT: Brand + contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {/* Big name */}
            <div className="mb-6">
              <p
                className="f-mono mb-2 flex items-center gap-2"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(249,115,22,0.7)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 1,
                    background: "#f97316",
                  }}
                />
                Portfolio
              </p>
              <h2
                className="f-serif f-gradient-text"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 3rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Nguyễn
                <br />
                Phúc Thịnh
              </h2>
              <p
                className="f-mono mt-2 text-neutral-700 dark:text-neutral-300 uppercase"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                }}
              >
                Frontend Developer · TP.HCM 🇻🇳
              </p>
            </div>

            {/* Available badge */}
            <div
              className="flex items-center gap-2.5 mb-6"
              style={{
                display: "inline-flex",
                padding: "6px 14px",
                borderRadius: "99px",
                border: "1px solid rgba(74,222,128,0.2)",
                background: "rgba(74,222,128,0.05)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 8,
                  height: 8,
                  flexShrink: 0,
                }}
              >
                <div className="f-avail-ring" />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                />
              </div>
              <span
                className="f-mono"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                }}
              >
                Sẵn sàng hợp tác
              </span>
            </div>

            {/* Contact items */}
            <div>
              {CONTACT.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="f-contact-row border-b border-neutral-200/80 dark:border-neutral-700/80"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                >
                  <div className="f-contact-icon">
                    <item.icon size={14} style={{ color: "#f97316" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className="f-mono text-neutral-700 dark:text-neutral-300 uppercase mb-[2px]"
                      style={{
                        fontSize: "0.54rem",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[0.82rem] font-semibold text-black dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>
                  {item.href !== "#" && (
                    <ArrowUpRight
                      size={12}
                      className="text-orange-500 shrink-0"
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Nav + Visitor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Nav */}
            <div>
              <p
                className="f-mono mb-4"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(249,115,22,0.7)",
                }}
              >
                Trang
              </p>
              <div className="grid grid-cols-2 gap-x-6">
                {NAV_LINKS.map((n, i) => (
                  <Link
                    key={i}
                    to={n.href}
                    className="group flex items-center gap-[6px] no-underline font-mono text-[0.62rem] tracking-[0.1em] uppercase text-black dark:text-white py-[6px] transition-colors duration-200 hover:text-orange-500 dark:hover:text-orange-500"
                  >
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Visitor counter */}
            <div
              className="px-5 py-4 rounded-[14px] border border-neutral-200/80 dark:border-neutral-700/80
                        bg-neutral-200/20 dark:bg-neutral-700/20"
            >
              <p className="f-mono mb-2 text-sm text-center font-semibold tracking-[0.2em] uppercase text-orange-500">
                Lượt ghé thăm
              </p>
              <VisitorCounter />
            </div>

            {/* Tip badge */}
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "99px",
                padding: "1.5px",
              }}
            >
              <div
                className="f-spin-border w-full"
                style={{ position: "absolute", inset: 0, borderRadius: "99px" }}
              />
              <div
                className="w-full items-center justify-center flex border border-neutral-200/80 dark:border-neutral-700/80
                        bg-neutral-100 dark:bg-neutral-800"
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  borderRadius: "99px",
                  zIndex: 1,
                }}
              >
                <p
                  className="f-mono text-black dark:text-white"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  💻 Dùng máy tính để trải nghiệm tốt nhất
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="f-rule mb-6" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="f-mono text-[0.64rem] text-black dark:text-white">
            © {new Date().getFullYear()} Nguyễn Phúc Thịnh · All rights reserved
          </p>

          <div className="flex items-center gap-[6px]">
            <span className="f-mono text-[0.64rem] text-black dark:text-white">
              Made with
            </span>

            <Heart size={14} className="text-black dark:text-white" />

            <span className="f-mono text-[0.64rem] text-black dark:text-white">
              &amp; React
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
