const FormField = ({
  label,
  name,
  register,
  errors,
  value,
  onChange,
  type = "text",
  pattern,
}) => {
  const error = errors?.[name];

  const baseStyle =
    "w-full bg-gray-100 dark:bg-neutral-800 border rounded-lg focus:ring-1 text-base outline-none py-2 px-3 leading-6 transition-colors duration-200 ease-in-out";

  const errorStyle =
    "border-red-500 focus:ring-red-400 dark:border-red-400 dark:focus:ring-red-500";

  const normalStyle =
    "border-gray-200 dark:border-neutral-700/50 focus:ring-neutral-300 dark:focus:ring-neutral-700";

  const registerProps = register
    ? register(name, { required: `${label} là bắt buộc`, pattern })
    : {};

  const inputProps = register ? registerProps : { value, onChange };

  if (type === "textarea") {
    return (
      <div className="relative mb-4">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <textarea
          {...inputProps}
          rows={3}
          className={`${baseStyle} ${
            error ? errorStyle : normalStyle
          } resize-none`}
        />
        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        {...inputProps}
        className={`${baseStyle} ${error ? errorStyle : normalStyle}`}
      />
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
