import { cn } from "@/lib/utils";
import { Blockquote } from "./blockquote";
import { Image } from "./image";
import { Link } from "./link";
import { Separator } from "./separator";
import React from "react";
import { H1, H2, H3, H4, H5, H6, P } from "./typography";
import { Li, Ol, Ul } from "./list";
import { Pre } from "./pre";
import { getMdxContent } from "@/lib/get-mdx-content";

type MDXProps = Omit<React.ComponentProps<"div">, "children"> & {
  children?: string | null
}

const MDX = async ({ children, style, className, ...props }: MDXProps) => {
  console.log(children)
  const mdx = await getMdxContent(children as string)
  return (
    <div
      style={{
        minWidth: "100%",
        ...style
      }}
      className={cn("prose prose-table:overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          "prose-p:font-body prose-ol:font-body prose-ul:font-body prose-li:font-body",
          "prose-blockquote:font-body prose-strong:font-body prose-em:font-body",
          "prose-headings:font-body prose-code:font-body prose-pre:font-body",
          "prose-table:font-body prose-th:font-body prose-td:font-body",
          "prose-code:before:content-[''] prose-code:after:content-[''] prose-code:font-normal prose-code:font-mono"
        )}
      >
        {mdx.mdxSource.content}
      </div>
    </div>
  );
};

const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: ({ href = "#", target, ...props }: React.ComponentProps<"a">) => (
    <Link
      href={href}
      target={(target ?? href?.startsWith("http")) ? "_blank" : "_self"}
      {...props}
    />
  ),
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => {
    <Blockquote className={cn("mt-6", className)} {...props} />;
  },
  img: ({
    alt,
    src,
    ...props
  }: Omit<React.ComponentProps<"img">, "src" | "ref"> & {
    src?: string;
  }) => (
    <Image
      src={src ?? ""}
      alt={alt ?? ""}
      {...props}
      height={600}
      width={800}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <Separator className="my-4 md:my-8" {...props} />
  ),
  pre: Pre,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
      <code
        className={cn(
          "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono data-[language]:grid data-[language]:bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
};

export { MDX, MDXComponents };
