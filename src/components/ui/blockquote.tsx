import { cn } from "@/lib/utils";
import React from "react";

type Props = React.ComponentProps<"blockquote">;

function Blockquote({ className, ...props }: Props) {
  return (
    <blockquote
      className={cn(
        "border-l-2 pl-6 italic",
        "from-muted/50 via-muted/10 bg-gradient-to-r to-transparent",
        className
      )}
      {...props}
    />
  );
}

Blockquote.displayName = "Blockquote";

export { Blockquote };
