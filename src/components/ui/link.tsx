import { cn } from "@/lib/utils";
import L from "next/link";
import React from "react";

type LinkProps = React.ComponentProps<typeof L>;

function Link({
  className,
  href,
  disabled,
  target,
  ...props
}: LinkProps & {
  disabled?: boolean;
}) {
  return (
    <L
      aria-disabled={disabled}
      className={cn(
        "text-primary hover:text-foreground underline underline-offset-4 transition-colors",
        disabled && "pointer-events-none cursor-default opacity-60",
        className
      )}
      target={
        (target ?? href.toString().startsWith("http")) ? "_blank" : "_self"
      }
      href={href}
      {...props}
    />
  );
}

Link.displayName = "Link";

export { Link };
