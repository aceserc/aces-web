import Link from "next/link";
import { cn } from "@/helpers/cn";
import { INoticesSchemaResponse } from "@/services/notice";
import { IoIosArrowForward } from "react-icons/io";

const NoticeCard = ({
  className,
  ...props
}: INoticesSchemaResponse & {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-md border-muted-foreground/20 border relative shadow-xl overflow-hidden group sm:max-w-[350px]",
        className
      )}
    >
      <div className="w-full sm:min-w-[350px] max-w-full sm:w-[350px] h-[200px] xs:h-[280px] overflow-hidden shadow-inner flex items-center justify-center">
        <img
          src={props.thumbnail}
          alt={props.title}
          className="rounded-t-md w-full h-full object-top object-cover"
        />
      </div>
      {/* title */}
      <div className="px-4 pt-5 pb-5 flex flex-col gap-3 relative bg-white">
        <h3 className="text-lg font-semibold truncate">{props.title}</h3>
        <div className="flex justify-between text-muted-foreground">
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
        <Link
          className="absolute h-12 w-12 -top-6 right-2 bg-gray-100 shadow-lg rounded-full p-3.5 hover:scale-105 group-hover:bg-red-500 group-hover:text-white transition-all"
          href={`/notices/${props._id}`}
        >
          <IoIosArrowForward className="w-full h-full" />
        </Link>
      </div>
    </div>
  );
};
export default NoticeCard;
