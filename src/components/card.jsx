// src/components/Timeline/card.jsx
import React from "react";
import { cn } from "../lib/utils";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm",
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
