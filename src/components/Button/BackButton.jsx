import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Quay lại", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`group flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 dark:border-neutral-700/50  
                  text-sm font-medium text-gray-700 dark:text-gray-200 
                  hover:bg-gray-100 dark:hover:bg-neutral-800 hover hover:shadow-sm 
                  transition-all duration-200 active:scale-95 ${className}`}
    >
      <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
