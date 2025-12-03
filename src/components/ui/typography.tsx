import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const H1 = ({ className, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "text-4xl font-bold tracking-tight font-heading",
        className,
      )}
      {...props}
    />
  );
};

const H2 = ({ className, ...props }: ComponentProps<"h2">) => {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight font-heading",
        className,
      )}
      {...props}
    />
  );
};

const H3 = ({ className, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold tracking-tight font-heading",
        className,
      )}
      {...props}
    />
  );
};

const H4 = ({ className, ...props }: ComponentProps<"h4">) => {
  return (
    <h4
      className={cn(
        "text-xl font-medium tracking-tight font-heading",
        className,
      )}
      {...props}
    />
  );
};

const Paragraph = ({ className, ...props }: ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "leading-7 text-base text-muted-foreground font-body",
        className,
      )}
      {...props}
    />
  );
};

export { H1, H2, H3, Paragraph, H4 };
