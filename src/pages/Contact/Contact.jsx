import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import {
  Send,
  ExternalLink,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .contact-root { font-family: 'Syne', sans-serif; }
    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Input field */
    .field-input {
      width: 100%;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 12px;
      padding: 12px 16px;
      color: white;
      font-family: 'Syne', sans-serif;
      font-size: 0.88rem;
      outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      resize: none;
    }
    .field-input::placeholder { color: rgba(255,255,255,0.22); }
    .field-input:focus {
      border-color: rgba(249,115,22,0.5);
      background: rgba(249,115,22,0.04);
      box-shadow: 0 0 0 3px rgba(249,115,22,0.08);
    }
    .field-input.error {
      border-color: rgba(239,68,68,0.5);
    }
    .field-input.error:focus {
      box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
    }

    /* Submit button */
    .submit-btn {
      width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 13px 24px;
      border-radius: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
      background: rgba(249,115,22,0.15);
      border: 1px solid rgba(249,115,22,0.45);
      color: white;
      cursor: pointer;
      transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
    }
    .submit-btn:hover:not(:disabled) {
      background: rgba(249,115,22,0.25);
      box-shadow: 0 0 28px rgba(249,115,22,0.2);
    }
    .submit-btn:active:not(:disabled) { transform: scale(0.99); }
    .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Section rule */
    .section-rule {
      height: 1px;
      background: linear-gradient(to right, rgba(249,115,22,0.4), rgba(255,255,255,0.04), transparent);
    }

    /* Testimonial card */
    .test-card {
      width: 300px; flex-shrink: 0;
      padding: 20px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.02);
    }

    /* Marquee */
    @keyframes marquee        { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
    @keyframes marquee-rev    { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); }    }
    .marquee-fwd { animation: marquee     28s linear infinite; }
    .marquee-rev { animation: marquee-rev 28s linear infinite; }
    .marquee-wrap:hover .marquee-fwd,
    .marquee-wrap:hover .marquee-rev { animation-play-state: paused; }

    /* Fade edges */
    .fade-edges {
      mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    }

    /* Social links override */
    .resume-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 22px; border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
      background: rgba(249,115,22,0.12);
      border: 1px solid rgba(249,115,22,0.35);
      color: white; text-decoration: none;
      transition: background 0.25s, box-shadow 0.25s;
      cursor: pointer;
    }
    .resume-btn:hover {
      background: rgba(249,115,22,0.22);
      box-shadow: 0 0 20px rgba(249,115,22,0.18);
    }

    /* Success overlay */
    .success-ring {
      animation: successPing 0.6s ease-out forwards;
    }
    @keyframes successPing {
      0%   { transform: scale(0.8); opacity: 0; }
      60%  { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1);   opacity: 1; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Sophia Martinez",
    role: "Global Enterprises Ltd.",
    text: "Wallet has completely transformed how we manage international payments. Transactions are fast, secure, and effortless.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Lee",
    role: "TechBridge Solutions",
    text: "Sending money to partners abroad has never been this smooth. Real-time tracking gives us complete peace of mind.",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Amira Hassan",
    role: "FinEdge Consulting",
    text: "The security features are outstanding. Multi-layer protection ensures our business transactions remain private.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Nguyen",
    role: "StartupHub Asia",
    text: "Incredible attention to detail and clean UI. Working with this developer was a seamless experience from day one.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

/* ─────────────────────────────────────────────
   FORM FIELD
───────────────────────────────────────────── */
const FIELD_ICONS = {
  name: User,
  phone: Phone,
  email: Mail,
  message: MessageSquare,
};

const FormField = ({
  label,
  name,
  register,
  errors,
  type = "text",
  pattern,
}) => {
  const error = errors?.[name];
  const Icon = FIELD_ICONS[name] || User;

  const registerProps = register
    ? register(name, { required: `${label} là bắt buộc`, pattern })
    : {};

  return (
    <div className="relative w-full mb-4">
      {/* Label row */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} style={{ color: "rgba(249,115,22,0.7)" }} />
        <label
          className="font-mono-code text-[0.62rem] tracking-[0.14em] uppercase"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {label}
        </label>
      </div>

      {type === "textarea" ? (
        <textarea
          {...registerProps}
          rows={4}
          className={`field-input ${error ? "error" : ""}`}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          {...registerProps}
          className={`field-input ${error ? "error" : ""}`}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-mono-code text-[0.6rem] tracking-wide mt-1.5 flex items-center gap-1"
            style={{ color: "rgba(239,68,68,0.8)" }}
          >
            ✕ {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TESTIMONIAL MARQUEE
───────────────────────────────────────────── */
function TestimonialCard({ item }) {
  return (
    <div className="test-card">
      <Quote
        size={16}
        style={{ color: "rgba(249,115,22,0.4)", marginBottom: "10px" }}
      />
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}
      >
        "{item.text}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={item.img}
          alt={item.name}
          className="w-8 h-8 rounded-full object-cover"
          style={{
            filter: "grayscale(30%)",
            border: "1.5px solid rgba(249,115,22,0.3)",
          }}
        />
        <div>
          <p
            className="text-white text-xs font-semibold leading-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {item.name}
          </p>
          <p
            className="font-mono-code text-[0.57rem] tracking-wide mt-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ reverse }) {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className={`flex gap-4 ${reverse ? "marquee-rev" : "marquee-fwd"}`}>
      {doubled.map((item, i) => (
        <TestimonialCard key={i} item={item} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SectionLabel({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <div
          className="p-1.5 rounded-lg"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <Icon size={12} className="text-orange-400" />
        </div>
      )}
      <h2
        className="font-mono-code text-[0.62rem] tracking-[0.18em] uppercase"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {children}
      </h2>
      <div className="flex-1 section-rule" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUCCESS STATE
───────────────────────────────────────────── */
function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-14 text-center gap-4"
    >
      <div className="success-ring">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.3)",
          }}
        >
          <CheckCircle2 size={28} className="text-orange-400" />
        </div>
      </div>
      <h3 className="font-serif-display text-2xl text-white">
        Đã gửi thành công<span className="text-orange-500">.</span>
      </h3>
      <p
        className="font-mono-code text-[0.65rem] tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Mình sẽ phản hồi sớm nhất có thể
      </p>
      <button onClick={onReset} className="resume-btn mt-2">
        <ArrowRight size={13} /> Gửi tin nhắn khác
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xkgjknda", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      toast.error("Có lỗi kết nối. Kiểm tra mạng và thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="contact-root min-h-screen pb-16">
      <FontLoader />

      {/* ── PAGE HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="pt-10 pb-6 max-w-5xl mx-auto"
      >
        <p className="font-mono-code text-orange-400 text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-orange-400" />
          Contact / Reach out
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-5xl md:text-6xl text-black dark:text-white leading-none mb-2">
              Liên hệ<span className="text-orange-500">.</span>
            </h1>
            <p className="text-neutral-500 text-sm">
              Mọi người liên hệ với mình qua form này nhé
            </p>
          </div>
          <span className="font-serif-display text-[5rem] text-white/4 leading-none select-none hidden sm:block">
            ✉
          </span>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-orange-500 via-orange-400/30 to-transparent" />
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="max-w-5xl mx-auto space-y-14">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
          {/* ── LEFT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            <SectionLabel icon={Mail}>Gửi tin nhắn</SectionLabel>

            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessState
                  key="success"
                  onReset={() => setSubmitted(false)}
                />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      label="Họ và tên"
                      name="name"
                      register={register}
                      errors={errors}
                    />
                    <FormField
                      label="Số điện thoại"
                      name="phone"
                      register={register}
                      errors={errors}
                      type="tel"
                      pattern={{
                        value: /^[0-9]{9,11}$/,
                        message: "Số điện thoại không hợp lệ",
                      }}
                    />
                  </div>

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    pattern={{
                      value: /^\S+@\S+$/i,
                      message: "Email không hợp lệ",
                    }}
                  />

                  <FormField
                    label="Nội dung"
                    name="message"
                    type="textarea"
                    register={register}
                    errors={errors}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn mt-1"
                  >
                    {loading ? (
                      <>
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white/30"
                          style={{
                            borderTopColor: "#f97316",
                            animation: "spin 0.8s linear infinite",
                          }}
                        />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        {" "}
                        <Send size={13} /> Gửi tin nhắn{" "}
                      </>
                    )}
                  </button>

                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: INFO ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="space-y-8"
          >
            {/* Contact card */}
            <div>
              <SectionLabel icon={ArrowRight}>Thông tin liên hệ</SectionLabel>

              <div className="space-y-3">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "thinh521@gmail.com",
                    href: "mailto:thinh521@gmail.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+84 xxx xxx xxx",
                    href: "tel:+84xxxxxxxxx",
                  },
                  {
                    icon: User,
                    label: "Location",
                    value: "TP.HCM, Việt Nam",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3.5 rounded-xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{
                        background: "rgba(249,115,22,0.08)",
                        border: "1px solid rgba(249,115,22,0.18)",
                      }}
                    >
                      <Icon size={13} className="text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-mono-code text-[0.55rem] tracking-widest uppercase"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-white text-sm font-medium hover:text-orange-400 transition-colors truncate block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm font-medium truncate">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <SectionLabel icon={ExternalLink}>Kết nối</SectionLabel>
              <div className="space-y-4">
                <button
                  onClick={() => navigate("/cv")}
                  className="resume-btn w-full justify-center"
                >
                  <ExternalLink size={13} /> Resume / CV
                </button>
                <SocialLinks />
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="p-4 rounded-xl flex items-start gap-3"
              style={{
                border: "1px solid rgba(249,115,22,0.18)",
                background: "rgba(249,115,22,0.04)",
              }}
            >
              <div
                className="mt-0.5 shrink-0 w-2 h-2 rounded-full bg-green-400"
                style={{
                  boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                  animation: "spin 3s linear infinite",
                }}
              />
              <div>
                <p className="text-white text-sm font-semibold leading-none mb-1">
                  Sẵn sàng hợp tác
                </p>
                <p
                  className="font-mono-code text-[0.6rem] tracking-wide"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Hiện đang open to work — freelance & full-time
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="section-rule" />

        {/* ── TESTIMONIALS MARQUEE ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel icon={Quote}>Nhận xét</SectionLabel>

          <div className="overflow-hidden space-y-4 marquee-wrap fade-edges">
            <div className="flex gap-4">
              <MarqueeRow reverse={false} />
            </div>
            <div className="flex gap-4">
              <MarqueeRow reverse={true} />
            </div>
          </div>
        </motion.section>
      </div>
    </article>
  );
};

export default Contact;
