const Divider = ({ width, align = "center", className = "" }) => {
  let marginStyle =
    align === "left"
      ? { marginLeft: 0, marginRight: "auto" }
      : align === "right"
      ? { marginLeft: "auto", marginRight: 0 }
      : { marginLeft: "auto", marginRight: "auto" };

  const hasWidthClass = /\bw-/.test(className);

  return (
    <div
      className={`border-t border-dashed border-gray-200 dark:border-neutral-700 ${className}`}
      style={!hasWidthClass && width ? { width, ...marginStyle } : marginStyle}
    />
  );
};

export default Divider;
