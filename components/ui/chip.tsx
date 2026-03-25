import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "primary" | "verified" | "issue" | "fact";
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "base", ...props }, ref) => {
    
    const variantStyles = {
      base: "bg-surface-soft border-line-default text-neutral-600",
      primary: "bg-brand-100 border-[#BFD8F6] text-brand-700",
      verified: "bg-warning-bg border-warning-line text-warning-text",
      issue: "bg-danger-bg border-danger-line text-danger-text",
      fact: "bg-success-bg border-success-line text-success-text",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center h-[34px] px-[14px] rounded-full text-caption border",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Chip.displayName = "Chip";

export { Chip };
