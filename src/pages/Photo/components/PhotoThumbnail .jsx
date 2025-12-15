import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImageIcon } from "lucide-react";

const PhotoThumbnail = memo(({ photo, idx }) => {
  return (
    <Link
      to={`/photos/${photo.id}`}
      className="relative block overflow-hidden rounded-2xl bg-white shadow-md 
                 transition hover:-translate-y-1 hover:shadow-xl
                 animate-fadeInUp"
      style={{ animationDelay: `${idx * 40}ms` }}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={photo.images[0]}
          alt={photo.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex justify-between items-center">
          <p className="text-white font-semibold text-sm truncate">
            {photo.title}
          </p>
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
        <ImageIcon className="w-3 h-3" />
        {photo.images.length}
      </div>
    </Link>
  );
});

PhotoThumbnail.displayName = "PhotoThumbnail";
export default PhotoThumbnail;
