import { cn } from "../lib/utils";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl backdrop-blur-md border border-gray-200 dark:border-neutral-700/50 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
