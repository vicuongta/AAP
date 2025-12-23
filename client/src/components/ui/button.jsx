// src/components/ui/button.jsx
import React from "react";
import { ArrowRight } from "lucide-react";

// tiny className join helper (no extra deps)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SIZE = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-lg",
};

const VARIANT = {
  primary:
    // matches your green + soft shadow pill look
    "bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/25 hover:bg-[#1b4332]",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100/80",
  outline:
    "border border-gray-200 bg-white text-gray-900 hover:border-[#2d6a4f] hover:text-[#2d6a4f]",
};

export const Button = React.forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    showArrow = false,
    className = "",
    type = "button",
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        // base styles
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/30 focus:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        SIZE[size] || SIZE.md,
        VARIANT[variant] || VARIANT.primary,
        // for arrow hover animation
        showArrow ? "group" : "",
        className
      )}
      {...props}
    >
      <span>{children}</span>

      {showArrow ? (
        <ArrowRight className="h-4 w-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </button>
  );
});
