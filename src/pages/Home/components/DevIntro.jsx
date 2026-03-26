import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Macbook from "../../../components/Macbook/Macbook";
import { IMAGES } from "../../../../public/images/imgaes";
import SocialLinks from "../../../components/SocialLinks/SocialLinks";
import Button from "../../../components/Button/Button";

const DevIntro = () => {
  return (
    <div className="w-full flex justify-center mt-8">
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
          <div className="p-6 py-10 text-white space-y-6">
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
              <div className="relative mb-6">
                {/* Avatar */}
                <div className="avatar-glow w-48 h-48 rounded-full overflow-hidden p-[3px] border-2 border-orange-500/35 bg-orange-500/10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800">
                    {IMAGES?.avatar ? (
                      <img
                        src={IMAGES.avatar}
                        alt="Thịnh"
                        className="w-full h-full object-cover"
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

                {/* Location badge */}
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full font-mono text-[0.58rem] tracking-widest bg-orange-500/15 border border-orange-500/40 text-orange-500">
                  TP.HCM 🇻🇳
                </div>

                {/* GPA badge */}
                <div className="absolute -top-2 -left-4 px-3 py-1.5 rounded-full font-mono text-[0.58rem] tracking-widest bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                  GPA 3.35 ✓
                </div>
              </div>
            </motion.div>

            <h1 className="font-playfair text-3xl font-bold text-center">
              Thịnh Nguyễn
            </h1>

            <div className="space-y-2 text-neutral-400 text-sm text-center">
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

            <p className="text-neutral-400 text-sm leading-relaxed text-center">
              Tôi là Thịnh, một lập trình viên frontend đam mê xây dựng những
              trải nghiệm web hiện đại. Tôi thích tạo ra giao diện người dùng
              đẹp mắt và tương tác người dùng mượt mà bằng React và các công cụ
              hiện đại
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-7"
            >
              <Button to="/cv" leftIcon={<Download size={13} />}>
                Resume / CV
              </Button>

              <Button
                to="/projects"
                rightIcon={<ArrowRight size={12} />}
                className="bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              >
                Dự án
              </Button>
            </motion.div>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex justify-center"
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* RIGHT  */}
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
