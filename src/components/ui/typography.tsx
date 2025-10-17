import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

const H3 = ({ className, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      className={cn(className, "text-2xl font-semibold tracking-tight")}
      {...props}
    />
  );
};

const H4 = ({ className, ...props }: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn(className, "text-xl font-medium tracking-tight")}
      {...props}
    />
  );
};

const Paragraph = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p
      className={cn(className, "leading-7 text-base text-muted-foreground")}
      {...props}
    />
  );
};

export { H3, Paragraph, H4 };
