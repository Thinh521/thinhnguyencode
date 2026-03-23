export default function SectionLabel({ icon: Icon, children, className = "" }) {
  return (
    <div className={`${className} flex items-center gap-2.5 mb-6`}>
      <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <Icon size={12} className="text-orange-500" />
      </div>

      <span className="font-mono text-xs tracking-[0.14em] uppercase text-black dark:text-white">
        {children}
      </span>

      <div className="flex-1 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
    </div>
  );
}
