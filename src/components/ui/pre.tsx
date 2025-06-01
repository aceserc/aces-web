"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useCallback, useState } from "react";
import { CheckIcon, ClipboardCopyIcon, XIcon } from "lucide-react";

const Pre = ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const copy = useCallback((text: string) => {
    try {
      setCopyStatus("copied");
      navigator.clipboard.writeText(text);
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  }, []);

  // Extract text content from MDX/React code blocks
  const extractTextContent = () => {
    if (!props.children) return "";

    // Handle MDX code blocks with nested structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractFromCodeElement = (element: any): string => {
      // If it's a string, return it directly
      if (typeof element === "string") return element;

      // If it's not an object or null, convert to string
      if (typeof element !== "object" || element === null)
        return String(element);

      // If it has children property
      if ("props" in element && element.props && "children" in element.props) {
        const children = element.props.children;

        // If children is an array, recursively extract from each child
        if (Array.isArray(children)) {
          return children.map(extractFromCodeElement).join("");
        }

        // Recursively extract from the child
        return extractFromCodeElement(children);
      }

      // If it has type and props (React element)
      if ("type" in element && "props" in element && element.props) {
        // If it has children property
        if ("children" in element.props) {
          const children = element.props.children;

          // If children is an array, recursively extract from each child
          if (Array.isArray(children)) {
            return children.map(extractFromCodeElement).join("");
          }

          // Recursively extract from the child
          return extractFromCodeElement(children);
        }
      }

      // Fallback: try to convert to string
      try {
        return String(element);
      } catch {
        return "";
      }
    };

    return extractFromCodeElement(props.children);
  };

  return (
    <div className="relative">
      <Button
        size={"icon"}
        variant={"secondary"}
        disabled={copyStatus !== "idle"}
        onClick={() => copy(extractTextContent())}
        className="absolute top-2 right-2 z-20 h-6 w-6"
      >
        <span className="sr-only">
          {copyStatus === "idle" ? "Copy" : copyStatus}
        </span>
        <ClipboardCopyIcon
          className={cn(
            `h-4 w-4 transition-all duration-300`,
            copyStatus === "idle" ? "scale-100" : "scale-0"
          )}
        />
        <CheckIcon
          className={cn(
            `text-primary absolute inset-0 m-auto h-4 w-4 transition-all duration-300`,
            copyStatus === "copied" ? "scale-100" : "scale-0"
          )}
        />
        <XIcon
          className={cn(
            `text-destructive absolute inset-0 m-auto h-4 w-4 transition-all duration-300`,
            copyStatus === "error" ? "scale-100" : "scale-0"
          )}
        />
      </Button>
      <pre
        className={cn(
          "relative mt-6 mb-4 overflow-x-auto rounded-lg border px-2 py-1 font-mono text-[15px]",
          className
        )}
        {...props}
      />
    </div>
  );
};

export { Pre };
