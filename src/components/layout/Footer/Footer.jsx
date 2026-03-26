import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, User, ArrowUpRight, Heart } from "lucide-react";
import VisitorCounter from "../../VisitorCounter";

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
        <p className="font-playfair text-neutral-900 dark:text-white text-lg sm:text-2xl italic leading-[1.5] max-w-[500px] mx-auto mb-3">
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
              <p className="mb-2 flex items-center gap-2 text-[0.58rem] tracking-[0.22em] font-bold uppercase text-primary-500/70">
                <span className="inline-block w-3.5 h-px bg-primary-500" />
                Portfolio
              </p>

              <h2 className="font-playfair f-gradient-text text-[clamp(2.5rem,7vw,3rem)] leading-[1.2] tracking-[-0.03em]">
                Nguyễn
                <br />
                Phúc Thịnh
              </h2>

              <p className="mt-2 text-neutral-700 dark:text-neutral-300 uppercase text-[0.6rem] tracking-[0.15em]">
                Frontend Developer · TP.HCM 🇻🇳
              </p>
            </div>

            {/* Available badge */}
            <div className="inline-flex items-center gap-2.5 mb-6 px-3.5 py-1.5 rounded-full border border-green-400/20 bg-green-400/5">
              <div className="relative w-2 h-2 shrink-0">
                <div className="f-avail-ring" />
                <div className="absolute inset-0 rounded-full bg-green-400" />
              </div>

              <span className="f-mono text-[0.58rem] tracking-[0.14em] uppercase text-green-400">
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
                    <item.icon size={14} className="text-primary-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-700 dark:text-neutral-300 uppercase mb-[2px] text-[0.54rem] tracking-[0.12em]">
                      {item.label}
                    </p>

                    <p className="text-[0.82rem] font-semibold text-neutral-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>

                  {item.href !== "#" && (
                    <ArrowUpRight
                      size={12}
                      className="text-primary-500 shrink-0"
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
              <p className="mb-4 text-[0.58rem] tracking-[0.22em] font-bold uppercase text-primary-500/70">
                Trang
              </p>

              <div className="grid grid-cols-2 gap-x-6">
                {NAV_LINKS.map((n, i) => (
                  <Link
                    key={i}
                    to={n.href}
                    className="group flex items-center gap-1.5 no-underline text-xs font-semibold tracking-[0.1em] text-neutral-900 dark:text-white py-1.5 transition-colors duration-200 hover:text-primary-500 dark:hover:text-primary-500"
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
            <div className="px-5 py-4 rounded-[14px] border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-200/20 dark:bg-neutral-700/20">
              <p className="f-mono mb-2 text-sm text-center font-semibold tracking-[0.2em] uppercase text-primary-500">
                Lượt ghé thăm
              </p>
              <VisitorCounter />
            </div>

            {/* Tip badge */}
            <div className="relative inline-flex rounded-full p-[1.5px]">
              <div className="f-spin-border absolute inset-0 rounded-full" />

              <div className="relative z-10 flex items-center justify-center w-full px-4 py-2 rounded-full border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-100 dark:bg-neutral-800">
                <p className="text-xs font-semibold text-neutral-900 dark:text-white tracking-[0.1em] whitespace-nowrap ">
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
          <p className="text-xs text-neutral-900 dark:text-white">
            © {new Date().getFullYear()} Nguyễn Phúc Thịnh · All rights reserved
          </p>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-900 dark:text-white">
              Made with
            </span>
            <Heart size={14} className="text-neutral-900 dark:text-white" />
            <span className="text-xs text-neutral-900 dark:text-white">
              &amp; React
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
