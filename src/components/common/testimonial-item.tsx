import React from "react";
import {
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { QuoteIcon } from "lucide-react";
import toText from "markdown-to-text"
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/server-actions/testimonials";
import { notionToMD } from "@/lib/notion";

const TestimonialItem = async ({ t }: { t: Testimonial }) => {
  const body = await notionToMD(t.id)
  const txt = toText(body)
  return (
    <CarouselItem className="max-w-fit h-full">
      <div className="relative rounded-lg h-full shadow max-w-sm px-8 py-4 md:px-10 md:py-10 leading-snug gap-4 flex flex-col justify-between">
        <div className="-ml-4">
          <QuoteIcon className="h-6 w-6 text-primary" />
        </div>
        <div className="mt-2 text-sm sm:text-base">
          <span className="text-muted-foreground">
            {txt.length > 150
              ? txt.slice(0, 150) + "..."
              : txt}
          </span>
          {body.length > 150 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"link"} className="opacity-85 ml-1 text-sm">
                  Read more
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2.5 text-left">
                    <div>
                      <Avatar
                        alt={t.name}
                        size={"lg"}
                        src={t.avatar}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 ">
                      <Link
                        href={t.contact ?? "#"}
                        className="underline"
                        target="_blank"
                      >
                        {t.name}
                      </Link>
                      <DialogDescription >
                        {t.role}
                      </DialogDescription>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {body}
                </p>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="end">
          <div className="mx-auto w-full border border-muted-foreground my-4" />
          <div className="flex items-center">
            <div>
              <Avatar
                alt={t.name}
                size={"default"}
                src={t.avatar}
              />
            </div>
            <div className="ml-4">
              <Link
                href={t.contact ?? "#"}
                target="_blank"
                className={cn(
                  "font-medium text-sm md:text-base",
                  t.contact && "underline"
                )}
              >
                {t.name}
              </Link>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {t.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  )
}

export { TestimonialItem }