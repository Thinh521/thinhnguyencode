import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import ShimmerButton from "../../components/ShimmerButton/ShimmerButton";
import SocialLinks from "../../components/SocialLinks/SocialLinks";

const testimonials = [
  {
    name: "Sophia Martinez",
    role: "Global Enterprises Ltd.",
    text: "Wallet has completely transformed how we manage international payments. Transactions are fast, secure, and effortless.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "David Lee",
    role: "TechBridge Solutions",
    text: "Sending money to partners abroad has never been this smooth. AtomWallet’s real-time tracking gives us complete peace of mind.",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Amira Hassan",
    role: "FinEdge Consulting",
    text: "The security features are outstanding. Multi-layer protection ensures our business transactions remain private and protected.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const animations = [
  "animate-marquee",
  "animate-marquee-reverse",
];

const MarqueeRow = ({ animation, testimonials }) => (
  <div className={`flex gap-6 ${animation}`}>
    {[...testimonials, ...testimonials].map((item, index) => (
      <div
        key={index}
        className="bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 
                   text-gray-200 rounded-2xl p-4 shadow-md w-[320px]"
      >
        <div className="flex items-center gap-3 mb-3">
          <img
            src={item.img}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-base font-semibold dark:text-white text-black">
              {item.name}
            </h4>
            <p className="text-xs text-gray-400">{item.role}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm line-clamp-3">
          {item.text}
        </p>
      </div>
    ))}
  </div>
);

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xkgjknda", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Cảm ơn bạn! Tin nhắn đã được gửi thành công.", {
          icon: null,
        });
        reset();
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.", { icon: null });
      }
    } catch (error) {
      toast.error("Có lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.", {
        icon: null,
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="space-y-8">
      <Header
        title="Liên hệ"
        subtitle="Mọi người liên hệ với mình qua form này nhé"
      />

      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:ml-auto w-full mb-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/2">
              <label className="block text-sm font-medium mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                {...register("name", { required: "Vui lòng nhập họ và tên" })}
                className={`w-full bg-gray-100 dark:bg-neutral-800 border rounded-lg focus:ring-1 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out
                          ${
                            errors.name
                              ? "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500"
                              : "border-gray-200 dark:border-neutral-700/50 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                          }`}
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="relative w-full md:w-1/2 mb-4">
              <label className="block text-sm font-medium mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /^[0-9]{9,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                className={`w-full bg-gray-100 dark:bg-neutral-800 border rounded-lg focus:ring-1 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out
                          ${
                            errors.phone
                              ? "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500"
                              : "border-gray-200 dark:border-neutral-700/50 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                          }`}
              />
              {errors.phone && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-2">
              Email của bạn
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email không hợp lệ",
                },
              })}
              className={`w-full bg-gray-100 dark:bg-neutral-800 border rounded-lg focus:ring-1 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out
                          ${
                            errors.email
                              ? "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500"
                              : "border-gray-200 dark:border-neutral-700/50 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                          }`}
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-2">Nội dung</label>
            <textarea
              {...register("message", { required: "Vui lòng nhập nội dung" })}
              className={`w-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700/50 rounded-lg focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 h-32 text-base outline-none py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${
                errors.email
                  ? "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500"
                  : "border-gray-200 dark:border-neutral-700/50 focus:ring-neutral-300 dark:focus:ring-neutral-700"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <ShimmerButton type="submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi tin nhắn"}
          </ShimmerButton>
        </form>

        <div className="flex my-10 justify-center item-center">
          <Link
            to="/cv"
            className="border max-w-max border-neutral-400 hover:border-gray-800 hover:text-gray-800 dark:hover:text-neutral-200 dark:hover:border-neutral-200 block px-4 py-2 text-base text-gray-600 dark:text-neutral-400 font-medium rounded-lg transition-colors duration-200"
          >
            CV
          </Link>
          <div className="border-r border-gray-400 w-1 h-8 mx-4 my-auto"></div>
          <SocialLinks />
        </div>
      </section>

      <section className="overflow-hidden relative py-10 space-y-6">
        {animations.map((animation, idx) => (
          <MarqueeRow
            key={idx}
            animation={animation}
            testimonials={testimonials}
          />
        ))}
      </section>
    </article>
  );
};

export default Contact;
