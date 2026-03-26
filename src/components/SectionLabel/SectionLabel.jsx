export default function SectionLabel({
  icon: Icon,
  children,
  count,
  className = "",
}) {
  return (
    <div className={`${className} flex items-center gap-2.5 mb-6`}>
      <div className="p-1.5 rounded-lg border border-primary-500/20 bg-primary-500/10">
        <Icon size={12} className="text-primary-500" />
      </div>

      <span className="font-playfair text-sm font-bold tracking-[0.14em] uppercase text-neutral-900 dark:text-white">
        {children}
      </span>

      {count !== undefined && (
        <span className="font-playfair text-[0.6rem] px-2 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500">
          {count}
        </span>
      )}

      <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent" />
    </div>
  );
}
