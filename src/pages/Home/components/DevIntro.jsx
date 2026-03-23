import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import Macbook from "../../../components/Macbook/Macbook";
import { IMAGES } from "../../../../public/images/imgaes";
import SocialLinks from "../../../components/SocialLinks/SocialLinks";
import { Link } from "react-router-dom";

const DevIntro = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-6xl bg-[#0d0d0d] rounded-xl shadow-xl overflow-hidden border border-[#222]">
        {/* Macbook top bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e]">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="text-xs text-gray-400 mx-auto">
            thinh@portfolio ~
          </span>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT */}
          <div className="p-6 text-white space-y-6">
            {/* RIGHT: Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center gap-4"
            >
              {/* Avatar frame */}
              <div className="relative">
                {/* Outer ring */}
                <div
                  className="avatar-glow w-48 h-48 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(249,115,22,0.35)",
                    padding: "3px",
                    background: "rgba(249,115,22,0.08)",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800">
                    {IMAGES?.avatar ? (
                      <img
                        src={IMAGES.avatar}
                        alt="Thịnh"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.9) saturate(0.85)" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-serif text-5xl text-orange-400/60">
                          T
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating badges */}
                <div
                  className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full font-mono text-[0.58rem] tracking-widest"
                  style={{
                    background: "rgba(249,115,22,0.15)",
                    border: "1px solid rgba(249,115,22,0.4)",
                    color: "#f97316",
                  }}
                >
                  TP.HCM 🇻🇳
                </div>
                <div
                  className="absolute -top-2 -left-4 px-3 py-1.5 rounded-full font-mono text-[0.58rem] tracking-widest"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.3)",
                    color: "#4ade80",
                  }}
                >
                  GPA 3.35 ✓
                </div>
              </div>

              {/* Location */}
              <div
                className="flex items-center gap-1.5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <MapPin size={11} />
                <span className="font-mono text-[0.58rem] tracking-wider">
                  Ho Chi Minh City
                </span>
              </div>
            </motion.div>

            <h1 className="font-playfair text-3xl font-bold">Thịnh Nguyễn</h1>

            <div className="space-y-2 text-gray-300 text-sm">
              <p>
                <span className="text-blue-400">role:</span> Mobile Developer
              </p>

              <p>
                <span className="text-blue-400">also:</span> UI Designer
              </p>

              <p>
                <span className="text-blue-400">location:</span> Vietnam
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              I'm Thịnh, a frontend developer passionate about building modern
              web experiences. I enjoy creating beautiful UI and smooth user
              interactions using React and modern tools.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-7"
            >
              <Link to="/cv" className="resume-btn">
                <Download size={13} /> Resume / CV
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[0.7rem] tracking-widest uppercase transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Dự án <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* RIGHT TERMINAL */}
          <div className="bg-black text-green-400 p-6 font-mono text-sm">
            <p>Welcome to thinh terminal v1.0.0</p>
            <p className="text-gray-400">Type 'help' to see commands.</p>

            <br />

            <p>
              <span className="text-blue-400">thinh@dev</span>:~
              <span className="text-yellow-400">$</span> _
            </p>

            <Macbook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevIntro;
