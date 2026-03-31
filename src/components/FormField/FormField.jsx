import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";

export default function FormField({
  label,
  name,
  register,
  errors,
  type = "text",
  pattern,
  icon: Icon = User,
  textareaRows = 4,
  inputClass = "",
  labelClass = "",
  errorClass = "",
}) {
  const error = errors?.[name];

  const registerProps = register
    ? register(name, {
        required: `${label} là bắt buộc`,
        ...(pattern && { pattern }),
      })
    : {};

  const baseInputClass = `w-full rounded-xl px-4 py-3 text-xs outline-none resize-none transition-all duration-200
  bg-gray-100 dark:bg-neutral-800 border focus:ring-2 focus:bg-orange-50/30 dark:focus:bg-orange-500/5
    ${
      error
        ? "border-red-400 focus:ring-red-400/30"
        : "border-gray-200 dark:border-neutral-700/50 focus:border-orange-400 focus:ring-orange-400/30"
    }
    ${inputClass}
  `;

  return (
    <div className="w-full mb-4">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={12} className="text-orange-500" />
        <label
          className={`text-xs text-neutral-900 dark:text-white ${labelClass}`}
        >
          {label}
        </label>
      </div>

      {/* Input */}
      {type === "textarea" ? (
        <textarea
          {...registerProps}
          rows={textareaRows}
          className={baseInputClass}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type={type}
          {...registerProps}
          className={baseInputClass}
          placeholder={`Nhập ${label.toLowerCase()}...`}
        />
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-xs mt-1.5 flex items-center gap-1 text-red-400 ${errorClass}`}
          >
            ✕ {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
