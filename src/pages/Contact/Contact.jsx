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
import PageHeader from "../../components/layout/PageHeader";
import SectionLabel from "../../components/SectionLabel";
import Button from "../../components/Button/Button";

/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

    .font-serif-display { font-family: 'Instrument Serif', serif; }
    .font-mono-code     { font-family: 'JetBrains Mono', monospace; }

    /* Input field */
    .field-input {
      width: 100%;
      border-radius: 12px;
      padding: 12px 16px;
      font-family: 'Syne', sans-serif;
      font-size: 0.88rem;
      outline: none;
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
      resize: none;
    }
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
       text-decoration: none;
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
        <label className="font-mono-code text-[0.62rem] text-black dark:text-white tracking-[0.14em] uppercase">
          {label}
        </label>
      </div>

      {type === "textarea" ? (
        <textarea
          {...registerProps}
          rows={4}
          className={`field-input bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 ${error ? "error" : ""}`}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          {...registerProps}
          className={`field-input bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 ${error ? "error" : ""}`}
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
    <div
      className="test-card
      bg-white/40 dark:bg-neutral-900/60
      backdrop-blur-md
      border border-neutral-200 dark:border-white/10
      text-neutral-800 dark:text-neutral-200
      shadow-sm dark:shadow-none
    "
    >
      <Quote size={16} className="text-orange-500/40 mb-2" />

      <p className="text-sm leading-relaxed mb-4 italic text-neutral-600 dark:text-neutral-400">
        "{item.text}"
      </p>

      <div className="flex items-center gap-3">
        <img
          src={item.img}
          alt={item.name}
          className="w-8 h-8 rounded-full object-cover grayscale-[30%] border border-orange-500/30"
        />

        <div>
          <p className="text-xs font-semibold leading-none text-neutral-900 dark:text-white font-syne">
            {item.name}
          </p>

          <p className="font-mono-code text-[0.57rem] tracking-wide mt-0.5 text-neutral-500 dark:text-neutral-400">
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
      <h3 className="font-serif-display text-2xl text-black dark:text-white">
        Đã gửi thành công<span className="text-orange-500">.</span>
      </h3>
      <p className="font-mono-code text-[0.65rem] tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
        Mình sẽ phản hồi sớm nhất có thể
      </p>

      <Button
        type="submit"
        className="max-w-max"
        onClick={onReset}
        leftIcon={<ArrowRight size={13} />}
      >
        Gửi tin nhắn khác
      </Button>
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
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <PageHeader
          title="Liên hệ."
          subtitle="Mọi người liên hệ với mình qua form này nhé"
          rightContent={
            <span className="font-serif-display text-[2.5rem] text-white/4 leading-none select-none hidden sm:block">
              ✉
            </span>
          }
        />
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="space-y-14">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 items-start">
          {/* ── LEFT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    leftIcon={
                      loading ? (
                        <div
                          className="w-4 h-4 rounded-full border-2 border-white/30"
                          style={{
                            borderTopColor: "#fff",
                            animation: "spin 0.8s linear infinite",
                          }}
                        />
                      ) : (
                        <Send size={13} />
                      )
                    }
                  >
                    {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                  </Button>

                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: INFO ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
                    className="flex items-center gap-3 p-3.5 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-xl"
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
                      <p className="font-mono-code text-[0.55rem] text-neutral-500 tracking-widest uppercase">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-black dark:text-white text-sm font-medium hover:text-orange-400 transition-colors truncate block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-black dark:text-white text-sm font-medium truncate">
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
                <Button
                  to="/cv"
                  leftIcon={<ExternalLink size={13} />}
                  className="max-w-max"
                >
                  Resume / CV
                </Button>

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
                <p className="text-black dark:text-white text-sm font-semibold leading-none mb-1">
                  Sẵn sàng hợp tác
                </p>
                <p className="font-mono-code text-[0.6rem] text-neutral-500 tracking-wide">
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
