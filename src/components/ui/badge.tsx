"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Style variants for the badge component */
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        "destructive-outline": "border-destructive text-destructive",
        outline: "text-foreground",
        success: "border-success bg-success text-success-foreground shadow",
        warning: "border-warning bg-warning text-warning-foreground shadow"
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1"
      },
      radius: {
        none: "rounded-none",
        md: "rounded-md",
        full: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "md"
    }
  }
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

/** Badge component for displaying short status text or counts */
function Badge({ className, variant, radius, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, radius, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
