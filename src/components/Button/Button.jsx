import { Link } from "react-router-dom";

const Button = ({
  href,
  to,
  children,
  ariaLabel,
  onClick,
  leftIcon,
  rightIcon,
  className = "",
  newTab = false,
}) => {
  const baseClasses = `
    group relative flex items-center justify-center gap-2 bg-orange-500 border border-orange-500
    px-6 lg:py-2 py-3 rounded-full transition-all duration-300 ease-in-out text-base
    transform hover:bg-orange-500/25 hover:border-orange-500/25 hover:shadow-[0_0_28px_rgba(249,115,22,0.22)] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  `;

  const content = (
    <>
      {leftIcon && <span className="text-lg text-white">{leftIcon}</span>}
      <span className="lg:text-sm text-xs font-bold text-white">
        {children}
      </span>
      {rightIcon && <span className="text-lg text-white">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
};

export default Button;
