import { Link } from "react-router-dom";

const Button = ({
  href,
  children,
  ariaLabel,
  onClick,
  leftIcon,
  rightIcon,
  className = "",
  external = false,
}) => {
  const baseClasses = `
    group relative flex items-center justify-center gap-2
    bg-gradient-to-r from-gray-800 to-gray-700
    hover:from-gray-700 hover:to-gray-600
    dark:from-gray-100 dark:to-gray-200
    dark:hover:from-white dark:hover:to-gray-100
    text-white dark:text-gray-800
    px-6 py-2 rounded-xl font-medium
    transition-all duration-300 ease-in-out text-base
    transform hover:scale-105 hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  `;

  const content = (
    <>
      {leftIcon && <span className="text-lg">{leftIcon}</span>}
      <span className="text-sm">{children}</span>
      {rightIcon && <span className="text-lg">{rightIcon}</span>}
    </>
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        to={href}
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
