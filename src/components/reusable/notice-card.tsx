import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { cn } from "@/helpers/cn";
import { INoticesSchemaResponse } from "@/services/notice";

const NoticeCard = ({
  className,
  ...props
}: INoticesSchemaResponse & {
  className?: string;
}) => {
  return (
    <Link
      href={`/notices/${props._id}`}
      className="min-w-full w-full sm:min-w-[400px] sm:w-[400px] snap-center"
    >
      <div
        className={cn(
          "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-xl overflow-hidden",
          className
        )}
      >
        <div className="w-full sm:min-w-[400px] max-w-full sm:w-[400px] h-[200px] overflow-hidden">
          <img
            src={props.thumbnail}
            alt={props.title}
            className="rounded-t-md w-full h-full object-top object-cover"
          />
        </div>
        {/* title */}
        <div className="px-4 pt-2 pb-5 flex flex-col gap-4">
          <h3 className="text-lg font-bold truncate">{props.title}</h3>
          <div className="flex justify-between text-muted-foreground">
            <button className="flex gap-1 group">
              <span>Know More</span>
              <IoIosArrowRoundForward className="h-5 w-5 relative group-hover:left-2 transition-transform" />
            </button>
            <div className="flex gap-4 items-center">
              {/* show month and day  */}
              {/* 
                One year passed: 2020 Dec
                Old Date: 12 Dec, 2020
                Else: 12 Dec
                */}
              <span>
                {new Date(props.createdAt).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              <hr className="h-4 w-px bg-muted-foreground/40" />
              {/* time format : 12:03 AM */}
              <span className="uppercase">
                {new Date(props.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoticeCard;
