import { ArrowRight } from "lucide-react";
import Button from "../../../components/Button/Button";

export default function AboutSection() {
  return (
    <>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
        {/* Left: Bio text */}
        <div>
          <h2 className="font-playfair text-4xl text-black dark:text-white leading-tight mb-5">
            Xin chào, mình là
            <br />
            <span className="gradient-text">Thịnh</span>
            <span className="text-primary-500">.</span>
          </h2>

          <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 leading-[1.85]">
            <p>
              Hiện là sinh viên năm cuối chuyên ngành{" "}
              <span className="text-primary-400">Thiết Kế Trang Web</span> tại
              Trường Cao Đẳng Công Nghệ Thông Tin TP.HCM (ITC).
            </p>

            <p>
              Có niềm đam mê đặc biệt với{" "}
              <span className="text-neutral-900 dark:text-white">
                lập trình giao diện (Frontend)
              </span>{" "}
              và không ngừng tự học để xây dựng những ứng dụng hiện đại, độc
              đáo. Mình cũng từng tham gia hackathon{" "}
              <span className="text-primary-400">Blockchain & AI</span> trong
              quá trình thực tập.
            </p>

            <p>
              Ngoài lập trình, mình còn đam mê{" "}
              <span className="text-neutral-900 dark:text-white">
                quay phim & chụp ảnh
              </span>{" "}
              — lưu giữ những khoảnh khắc đáng nhớ nhất qua ống kính.
            </p>
          </div>

          <div className="mt-6">
            <Button
              to="/about"
              rightIcon={<ArrowRight size={13} />}
              className="max-w-max"
            >
              Xem thêm
            </Button>
          </div>
        </div>

        {/* Right: Info grid */}
        <div className="space-y-3">
          {[
            { label: "Tên", value: "Nguyễn Phúc Thịnh" },
            { label: "Trường", value: "ITC TP.HCM" },
            { label: "Chuyên ngành", value: "Thiết Kế Trang Web" },
            { label: "GPA", value: "3.35 / 4.0 — Giỏi" },
            { label: "Địa điểm", value: "TP. Hồ Chí Minh" },
            { label: "Tình trạng", value: "Đã tốt nghiệp ✓" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 py-2.5 border-b border-neutral-200/80 dark:border-neutral-700/80"
            >
              <span className="text-xs text-neutral-600 dark:text-neutral-400 shrink-0">
                {label}
              </span>
              <span className="text-neutral-900 dark:text-white text-xs text-right font-bold">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
