import { cn } from "@/lib/utils";

type OlProps = React.ComponentProps<"ol">;

function Ol({ className, ...props }: OlProps) {
  return (
    <ol
      className={cn("text-muted-foreground my-3 ml-6 list-decimal", className)}
      {...props}
    />
  );
}

type LiProps = React.ComponentProps<"li">;

function Li({ className, ...props }: LiProps) {
  return (
    <li className={cn("text-muted-foreground mt-2", className)} {...props} />
  );
}

Li.displayName = "Li";

type Props = React.ComponentProps<"ul">;

function Ul({ className, ...props }: Props) {
  return (
    <ul
      className={cn("text-muted-foreground my-3 ml-6 list-disc", className)}
      {...props}
    />
  );
}

Ul.displayName = "Ul";

export { Ol, Li, Ul };
