import { ArrowRight, ExternalLink } from "lucide-react";
import Button from "../../../components/Button/Button";

export default function BottomCTA() {
  return (
    <>
      <div className="s-rule mb-10" />

      <div className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center grain border border-primary-500/20 bg-primary-300/10 dark:bg-primary-100/10">
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "200px",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <p className="text-primary-400 text-[0.65rem] tracking-[0.25em] uppercase mb-4 relative z-10">
          ◆ Hãy kết nối
        </p>

        <h2 className="font-playfair text-2xl md:text-4xl text-neutral-900 dark:text-white font-medium leading-tight mb-4 relative z-10">
          Cùng tạo ra điều
          <br />
          <span className="gradient-text">tuyệt vời</span>
        </h2>

        <p className="text-sm max-w-sm mx-auto mb-8 relative z-10 text-neutral-600 dark:text-neutral-400">
          Mình luôn sẵn sàng hợp tác cho các dự án thú vị — freelance hoặc
          full-time.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap relative z-10">
          <Button
            to="/contact"
            variant="primary"
            leftIcon={<ArrowRight size={13} />}
          >
            Liên hệ ngay
          </Button>

          <Button
            to="/projects"
            variant="outline"
            leftIcon={<ExternalLink size={13} />}
          >
            Xem dự án
          </Button>
        </div>
      </div>
    </>
  );
}
