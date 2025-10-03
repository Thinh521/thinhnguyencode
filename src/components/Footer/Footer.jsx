import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Heart, User } from "lucide-react";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Footer.module.css";
import Divider from "../Divider/Divider";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactItems = [
    {
      icon: User,
      label: "Họ và tên",
      value: "Nguyễn Phúc Thịnh",
      href: "#",
    },
    {
      icon: Phone,
      label: "Điện thoại",
      value: "07 8697 9877",
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
      value: "Nguyễn Văn Khối, Phường 11, Gò Vấp, TP. HCM",
      href: "#",
    },
  ];

  return (
    <footer
      className={`relative overflow-hidden transition-all duration-1000 mb-36 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="py-16">
        <div className="text-center mb-12">
          <div className="relative inline-flex rounded-full p-[2px] overflow-hidden">
            <style>
              {`
                @property --angle {
                  syntax: '<angle>';
                  initial-value: 0deg;
                  inherits: false;
                }
                @keyframes shimmer-spin {
                  to {
                    --angle: 360deg;
                  }
                }
              `}
            </style>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from var(--angle), transparent 25%, #ef4444, transparent 50%)",
                animation: "shimmer-spin 4s linear infinite",
              }}
            />
            <div className="relative flex flex-col items-center text-center lg:inline-flex lg:flex-row lg:items-center lg:gap-3 px-6 py-3 bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm rounded-full">
              <span className="text-sm text-black dark:text-white font-medium">
                Dùng máy tính để có trải nghiệm tốt nhất
              </span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <SectionTitle>Thông tin liên hệ</SectionTitle>

          <div>
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex items-center gap-4 mb-8 rounded-2xl "
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-200/60 to-gray-300/60 dark:from-gray-700/60 dark:to-gray-600/60 group-hover:from-gray-300/80 group-hover:to-gray-400/80 dark:group-hover:from-gray-600/80 dark:group-hover:to-gray-500/80 transition-all duration-300">
                  <item.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors break-all">
                    {item.value}
                  </p>
                </div>

                <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            ))}
          </div>
        </div>

        <Divider width="100%" />

        <div className="py-10">
          <div className="flex items-center gap-3 justify-center mb-7">
            <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 animate-pulse" />
            <span className="text-sm text-black dark:text-white">
              Sản phẩm được làm ra bằng cả tâm huyết
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm text-black dark:text-white mb-2">
              © {new Date().getFullYear()} Nguyễn Phúc Thịnh
            </p>
            <p className="text-xs">All rights reserved! ✨</p>
          </div>
        </div>

        <Divider className="w-full lg:w-[80%]" />

        <div className="text-center mt-8 pt-8">
          <p className="text-sm font-medium text-black dark:text-white italic">
            Mã là thơ ca, thiết kế là nghệ thuật cùng nhau tạo nên điều kỳ
            diệu.
          </p>
          <div className="flex justify-center mt-8">
            <div className={styles.typing_indicator}>
              <div
                className={`${styles.typing_circle} bg-black dark:bg-white`}
              />
              <div
                className={`${styles.typing_circle} bg-black dark:bg-white`}
              />
              <div
                className={`${styles.typing_circle} bg-black dark:bg-white`}
              />
              <div
                className={`${styles.typing_shadow} bg-black/20 dark:bg-white/30`}
              />
              <div
                className={`${styles.typing_shadow} bg-black/20 dark:bg-white/30`}
              />
              <div
                className={`${styles.typing_shadow} bg-black/20 dark:bg-white/30`}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
