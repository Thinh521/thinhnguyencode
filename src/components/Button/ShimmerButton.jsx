export default function ShimmerButton({
  children = "Shimmer Button",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  style = {},
}) {
  const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes shimmer-spin {
      to { --angle: 360deg; }
    }
  `;

  return (
     <div className="w-full flex font-sans">
      <style>{customCss}</style>

      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={style}
        className={`relative inline-flex items-center justify-center p-[1.5px] rounded-xl overflow-hidden group transition-opacity duration-200
          ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}
          ${className}
        `}
      >
        {!disabled && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from var(--angle), transparent 25%, #0ea5e9, transparent 50%)",
              animation: "shimmer-spin 2.5s linear infinite",
            }}
          />
        )}

        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-6 py-3 rounded-xl text-sm font-semibold text-gray-900 dark:text-white bg-gray-200 dark:bg-neutral-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
          {children}
        </span>
      </button>
    </div>
  );
}
