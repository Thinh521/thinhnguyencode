export default function ShimmerButton({
  children = "Shimmer Button",
  onClick,
  disabled = false,
  type = "button",
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
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden group border transition-opacity duration-200 ${
          disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
        } bg-gray-100 dark:bg-neutral-800 border-gray-200 dark:border-neutral-700/50`}
      >
        {!disabled && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from var(--angle), transparent 25%, #ef4444, transparent 50%)",
              animation: "shimmer-spin 2.5s linear infinite",
            }}
          />
        )}
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-gray-900 dark:text-white bg-gray-200 dark:bg-neutral-700 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300 font-semibold text-sm">
          {children}
        </span>
      </button>
    </div>
  );
}
