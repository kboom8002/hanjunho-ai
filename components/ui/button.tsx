import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "share";
  size?: "lg" | "md" | "sm";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      primary: "bg-brand-700 border-brand-700 text-white font-semibold hover:bg-brand-800 border",
      secondary: "bg-white border-brand-700 text-brand-700 font-semibold hover:bg-brand-050 border",
      tertiary: "bg-transparent border-line-default text-neutral-600 font-medium hover:bg-surface-muted border",
      share: "bg-neutral-900 border-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 border",
    };

    const sizeStyles = {
      lg: "h-[52px] px-6 text-body rounded-2xl",
      md: "h-[44px] px-5 text-body rounded-2xl",
      sm: "h-[36px] px-4 text-caption rounded-[14px]",
      share: "h-[44px] px-5 text-caption rounded-full",
    };

    const finalSize = variant === "share" ? "share" : size;

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[finalSize],
          variant === 'tertiary' ? 'rounded-[14px]' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
