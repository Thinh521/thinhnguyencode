const Divider = ({ width = "100%", align = "center" }) => {
  let marginStyle =
    align === "left"
      ? { marginLeft: 0, marginRight: "auto" }
      : align === "right"
      ? { marginLeft: "auto", marginRight: 0 }
      : { marginLeft: "auto", marginRight: "auto" };

  return (
    <div
      className="border-t border-dashed border-gray-200 dark:border-neutral-700"
      style={{ width, ...marginStyle }}
    ></div>
  );
};

export default Divider;
