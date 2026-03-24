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
  type = "button",
  disabled = false,
  variant = "primary",
}) => {
  const baseClasses = `
    group relative flex items-center justify-center gap-2
    px-6 py-3 lg:py-2 rounded-full transition-all duration-300 ease-in-out
    border text-base font-bold focus:outline-none
  `;

  const variants = {
    primary: `
      bg-orange-500 border-orange-500 text-white
      hover:bg-orange-500/25 hover:border-orange-500/25
      hover:shadow-[0_0_28px_rgba(249,115,22,0.22)]
    `,
    outline: `
      bg-transparent border-orange-500 text-orange-500
      hover:bg-orange-500/10
    `,
    ghost: `
      bg-transparent border-transparent text-orange-500
      hover:bg-orange-500/10
    `,
  };

  const content = (
    <>
      {leftIcon && <span className="text-lg">{leftIcon}</span>}
      <span className="lg:text-sm text-xs">{children}</span>
      {rightIcon && <span className="text-lg">{rightIcon}</span>}
    </>
  );

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
