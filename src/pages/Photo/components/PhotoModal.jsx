import { X } from "lucide-react";

const PhotoModal = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center px-3"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl lg:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={photo.images[0]}
            alt={photo.title}
            className="w-full max-h-[85vh] object-contain rounded-xl"
          />

          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 
            bg-black/40 hover:bg-black/60 text-white 
            p-2 rounded-full backdrop-blur transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className="absolute bottom-0 left-0 right-0 
          p-3 sm:p-4 rounded-b-xl 
          bg-gradient-to-t from-black/80 to-transparent"
          >
            <p className="text-white font-semibold text-xs sm:text-sm md:text-base">
              {photo.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
