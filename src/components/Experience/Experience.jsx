import { memo, useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { timelineData } from "../../data/timelineData";
import Button from "../../components/Button/Button";

// --- IMAGES ---
const TimelineImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full bg-gray-200 dark:bg-neutral-800 rounded-xl overflow-hidden border border-gray-300 dark:border-neutral-700 shadow-sm">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-10 h-10 transform rotate-45">
            {[0, 0.15, 0.3, 0.45].map((delay, i) => (
              <div
                key={i}
                className="absolute bg-neutral-900 dark:bg-white w-4 h-4 animate-ping rounded-sm opacity-60"
                style={{
                  animationDuration: "1.2s",
                  animationDelay: `${delay}s`,
                  ...(i === 0
                    ? { top: 0, left: 0 }
                    : i === 1
                    ? { top: 0, right: 0 }
                    : i === 2
                    ? { bottom: 0, right: 0 }
                    : { bottom: 0, left: 0 }),
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Ảnh chính */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`object-contain w-full h-full transition-opacity duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

// --- BADGE COMPONENT ---
const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default:
      "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
    outline:
      "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// --- ITEM CONTENT ---
const TimelineItemContent = memo(({ item }) => (
  <div className="mt-4 lg:mt-6 space-y-4 lg:space-y-6 animate-in slide-in-from-top-1 duration-200">
    {/* Images */}
    <TimelineImage src={item.images[0]} alt={item.role} />

    <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
      {item.title}
    </h3>

    <div className="border-t border-gray-200 dark:border-neutral-700/50" />

    {/* Links */}
    <div className="flex gap-4 flex-wrap">
      {item.links
        ?.filter(
          (link) => link.label === "Chi tiết" || link.label === "Xem Dự án"
        )
        .map((link, idx) =>
          link.internal ? (
            <Button key={idx} to={link.url} className="flex-1 text-center">
              {link.label}
            </Button>
          ) : (
            <Button
              key={idx}
              href={link.url}
              newTab
              className="flex-1 text-center"
            >
              {link.label}
            </Button>
          )
        )}
    </div>
  </div>
));
TimelineItemContent.displayName = "TimelineItemContent";

// --- TIMELINE ITEM ---
const TimelineItem = memo(({ item, expanded, onToggle }) => {
  const Icon = item.icon;
  const headerId = `timeline-header-${item.id}`;
  const contentId = `timeline-content-${item.id}`;

  return (
    <div className="relative group">
      {/* Line */}
      <div className="absolute left-1.5 lg:left-6 top-14 bottom-0 w-[2px] bg-gradient-to-b from-black via-gray-500 to-white dark:from-white dark:via-gray-400 dark:to-black" />

      {/* Node */}
      <div className="absolute lg:left-4 top-6 w-4 h-4 bg-white dark:bg-[#060010] border-2 border-slate-300 dark:border-slate-800 rounded-full flex items-center justify-center z-10">
        <div className="w-2 h-2 bg-slate-900 dark:bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card */}
      <div className="ml-7 lg:ml-12 mb-8">
        <div
          className={`bg-gray-100 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700/50 transition-all ${
            expanded ? "shadow-sm" : "shadow-none hover:shadow-sm"
          }`}
        >
          {/* Header */}
          <button
            id={headerId}
            className="w-full text-left p-4 lg:p-6 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700/50 transition-colors rounded-t-lg"
            onClick={() => onToggle(item.id)}
            aria-expanded={expanded}
            aria-controls={contentId}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#060010] rounded-md">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    {item.role}
                  </h3>
                </div>

                <div className="flex items-center gap-3 ml-0 lg:ml-11">
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                  <span className="text-xs">{item.duration}</span>
                </div>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-black dark:text-white transition-transform ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Content */}
          {expanded && (
            <div
              id={contentId}
              role="region"
              aria-labelledby={headerId}
              className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-gray-200 dark:border-neutral-700/50"
            >
              <TimelineItemContent item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
TimelineItem.displayName = "TimelineItem";

// --- MAIN TIMELINE ---
export function ProfessionalTimeline({
  data,
  defaultExpandedIds,
  expandMode = "multi",
}) {
  const initial = defaultExpandedIds ?? data.map((item) => item.id);
  const [expanded, setExpanded] = useState(new Set(initial));

  const onToggle = useCallback(
    (id) => {
      setExpanded((prev) => {
        if (expandMode === "single") {
          return prev.has(id) ? new Set() : new Set([id]);
        }
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
    [expandMode]
  );

  return (
    <div className="relative">
      {data.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          expanded={expanded.has(item.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default function Timeline() {
  return <ProfessionalTimeline data={timelineData} expandMode="multi" />;
}
