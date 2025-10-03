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
    group relative flex items-center justify-center gap-2
    bg-gradient-to-r from-gray-800 to-gray-700
    hover:from-gray-700 hover:to-gray-600 dark:from-gray-100 dark:to-gray-200
    dark:hover:from-white dark:hover:to-gray-100 text-white dark:text-gray-800
    px-6 lg:py-2 py-3 rounded-full transition-all duration-300 ease-in-out text-base
    transform hover:scale-105 hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  `;

  const content = (
    <>
      {leftIcon && <span className="text-lg">{leftIcon}</span>}
      <span className="lg:text-sm text-xs font-bold">{children}</span>
      {rightIcon && <span className="text-lg">{rightIcon}</span>}
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
