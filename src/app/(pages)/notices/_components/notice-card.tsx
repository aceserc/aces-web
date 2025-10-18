import { Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate, formatDistance } from "date-fns";
import { Client } from "@/components/ui/client";
type NoticeCardProps = {
  coverImages: string[];
  title: string;
  createdAt: string;
  href: string;
};

const NoticeCard = ({ ...props }: NoticeCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm border-muted-foreground/20 border relative group w-full overflow-hidden"
      )}
    >
      <div className="w-full max-w-full h-[200px]  overflow-hidden shadow-inner flex items-center justify-center">
        <img
          src={props.coverImages[0] || "/thumb.png"}
          alt={props.title}
          className="rounded-t-sm w-full h-full object-top object-cover bg-muted"
        />
      </div>
      <div className="px-4 pt-6 pb-5 flex flex-col gap-3 relative bg-background">
        <Paragraph className="line-clamp-2 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
          {props.title}
        </Paragraph>
        <div className="flex justify-between text-muted-foreground">
          <Client>
            <div className="flex gap-4 items-center">
              <span>
                {formatDistance(new Date(props.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
              <hr className="h-4 w-px bg-muted-foreground/40" />
              <span className="uppercase">
                {formatDate(new Date(props.createdAt), "hh:mm a")}
              </span>
            </div>
          </Client>
        </div>
        <Link
          className="absolute h-12 w-12 -top-6 right-2 bg-muted shadow-lg rounded-full p-3.5 hover:scale-105 group-hover:bg-destructive group-hover:text-foreground transition-all"
          href={props.href}
          target="_blank"
        >
          <ArrowRight className="w-full h-full" />
        </Link>
      </div>
    </div>
  );
};
export { NoticeCard };
