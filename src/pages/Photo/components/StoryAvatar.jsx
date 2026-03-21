import { memo } from "react";
import { Play } from "lucide-react";

const StoryAvatar = memo(({ story, index, onClick, viewed }) => {
  return (
    <div
      onClick={() => onClick(index)}
      className="group flex flex-col items-center gap-2.5 flex-shrink-0 cursor-pointer"
      style={{ width: 72 }}
    >
      {/* Ring + avatar */}
      <div className="relative">
        {/* Inner circle */}
        <div
          className="relative z-10 w-14 h-14 rounded-full overflow-hidden"
          style={{
            border: "2px solid #0a0a0a",
            background: "#111",
          }}
        >
          <video
            src={`/thinhnguyencode/videos/${story.video}`}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500"
          />

          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play size={11} className="text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>

        {/* "New" dot */}
        {!viewed && (
          <div
            className="absolute -bottom-0.5 -right-0.5 z-20 w-3.5 h-3.5 rounded-full border-2 border-neutral-950"
            style={{ background: "#f97316" }}
          />
        )}
      </div>

      <p
        className="text-[0.62rem] text-center truncate w-full leading-none text-black dark:text-white"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.03em",
        }}
      >
        {story.username}
      </p>
    </div>
  );
});

StoryAvatar.displayName = "StoryAvatar";
export default StoryAvatar;
