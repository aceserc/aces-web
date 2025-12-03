import Img from "next/image";
import type React from "react";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Img>;

const Image = ({ className, ...props }: Props) => {
  if (process.env.NODE_ENV === "development")
    // @ts-expect-error : next/image does not have priority prop
    return <img className={cn("bg-muted rounded-md", className)} {...props} />;
  return <Img className={cn("bg-muted rounded-md", className)} {...props} />;
};

export { Image };
