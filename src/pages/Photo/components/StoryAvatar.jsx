import { memo } from "react";
import { Play } from "lucide-react";

const StoryAvatar = memo(({ story, index, onClick, viewed }) => {
  const borderClass = viewed
    ? "bg-gray-400 p-[2.5px]"
    : "bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-[2.5px]";

  return (
    <div
      onClick={() => onClick(index)}
      className="group flex flex-col items-center space-y-2.5 flex-shrink-0 cursor-pointer"
      style={{ width: 80 }}
    >
      <div className={`relative w-16 h-16 rounded-full ${borderClass}`}>
        <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-300">
          {/* video thumbnail */}
          <video
            src={`/thinhnguyencode/videos/${story.video}`}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* overlay – hover only */}
          <div
            className="absolute inset-0 bg-black/30 
                       opacity-0 transition-opacity duration-300
                       group-hover:opacity-100"
          />

          {/* play icon – hover only */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       opacity-0 scale-90 transition-all duration-300
                       group-hover:opacity-100 group-hover:scale-100"
          >
            <div
              className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm 
                            flex items-center justify-center"
            >
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs font-medium text-center truncate">
        {story.username}
      </p>
    </div>
  );
});

StoryAvatar.displayName = "StoryAvatar";
export default StoryAvatar;
