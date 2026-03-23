export default function SectionLabel({
  icon: Icon,
  children,
  count,
  className = "",
}) {
  return (
    <div className={`${className} flex items-center gap-2.5 mb-6`}>
      <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <Icon size={12} className="text-orange-500" />
      </div>

      <span className="font-mono text-xs tracking-[0.14em] uppercase text-black dark:text-white">
        {children}
      </span>

      {count !== undefined && (
        <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500">
          {count}
        </span>
      )}

      <div className="flex-1 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
    </div>
  );
}
