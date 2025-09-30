const SectionTitle = ({ children }) => {
  return (
    <h1 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
      <span className="w-1 h-5 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full"></span>
      {children}
    </h1>
  );
};

export default SectionTitle;
