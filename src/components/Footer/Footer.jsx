import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Monitor,
  Heart,
  Sparkles,
  User,
} from "lucide-react";

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
      className={`relative overflow-hidden transition-all duration-1000 mb-16 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="py-16">
        {/* Thông báo hiển thị tốt nhất trên PC */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-full mb-4">
            <Monitor className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
              Dùng máy tính để có trải nghiệm tốt nhất nhé
            </span>
            <Sparkles className="w-4 h-4 text-gray-600 dark:text-gray-400 animate-pulse" />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="mb-12">
          <h1 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full"></span>
            Thông tin liên hệ
          </h1>

          <div className="mx-4">
            {contactItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex items-center gap-4 p-5 mb-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-400/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-500/10 dark:hover:shadow-gray-400/10"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-gray-200/60 to-gray-300/60 dark:from-gray-700/60 dark:to-gray-600/60 group-hover:from-gray-300/80 group-hover:to-gray-400/80 dark:group-hover:from-gray-600/80 dark:group-hover:to-gray-500/80 transition-all duration-300">
                  <item.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors break-all">
                    {item.value}
                  </p>
                </div>

                <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
          <div className="flex items-center gap-3 justify-center mb-6">
            <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Made with love in Ho Chi Minh City
            </span>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              © {new Date().getFullYear()} Nguyễn Phúc Thịnh
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              All rights reserved! ✨
            </p>
          </div>
        </div>

        {/* Quote + chấm nhấp nháy */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200/30 dark:border-gray-700/30">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 italic">
            Mã là thơ ca, thiết kế là nghệ thuật và cùng nhau tạo nên điều kỳ
            diệu.
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
