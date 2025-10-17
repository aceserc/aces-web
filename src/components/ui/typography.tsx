import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

const H3 = ({ className, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
};

const H4 = ({ className, ...props }: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn("text-xl font-medium tracking-tight", className)}
      {...props}
    />
  );
};

const Paragraph = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p
      className={cn("leading-7 text-base text-muted-foreground", className)}
      {...props}
    />
  );
};

export { H3, Paragraph, H4 };
