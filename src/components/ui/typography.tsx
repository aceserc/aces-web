import { cn } from "@/lib/utils";
import React from "react";

type H1Props = React.ComponentProps<"h1">;

function H1({ className, ...props }: H1Props) {
  return (
    <h1
      className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)}
      {...props}
    />
  );
}

H1.displayName = "H1";
type H2Props = React.ComponentProps<"h2">;

function H2({ className, ...props }: H2Props) {
  return (
    <h2
      className={cn(
        "mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  );
}

H2.displayName = "H2";

type H3Props = React.ComponentProps<"h3">;

function H3({ className, ...props }: H3Props) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

H3.displayName = "H3";

type H4Props = React.ComponentProps<"h4">;

function H4({ className, ...props }: H4Props) {
  return (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

H4.displayName = "H4";

type H5Props = React.ComponentProps<"h5">;

function H5({ className, ...props }: H5Props) {
  return (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

H5.displayName = "H5";

type H6Props = React.ComponentProps<"h6">;

function H6({ className, ...props }: H6Props) {
  return (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

H6.displayName = "H6";

type Props = React.ComponentProps<"p">;

function P({ className, ...props }: Props) {
  return (
    <p
      className={cn(
        "text-muted-foreground leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  );
}

P.displayName = "P";

export { H1, H2, H3, H4, H5, H6, P };
