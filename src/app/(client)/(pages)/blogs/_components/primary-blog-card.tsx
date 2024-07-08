import { cn } from "@/helpers/cn";
import { IHandleGetBlogsServiceResponse } from "@/services/blogs";
import Link from "next/link";

type Props = IHandleGetBlogsServiceResponse["blogs"][0] & {
  className?: string;
  style?: React.CSSProperties;
};

const PrimaryBlogCard = (props: Props) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col lg:flex-row lg:items-center gap-7.5 lg:gap-11 bg-white shadow-lg rounded-xl p-4 lg:p-2.5 lg:py-4",
        props.className
      )}
      style={props.style}
    >
      <div className="lg:max-w-[536px] w-full lg:max-h-[320px] flex items-center justify-center overflow-hidden rounded-md">
        <Link href={`/blogs/${props._id}`} className="w-full h-full">
          <img
            className="w-full rounded-md object-cover object-center h-full "
            src={props.thumbnail.url}
            alt="hero"
          />
        </Link>
      </div>
      <div className="lg:max-w-[540px] w-full">
        <div className="flex gap-2 flex-wrap mt-3">
          {props.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blogs/tag/${tag}`}
              className="inline-flex text-purple-500 bg-purple-400/[0.08] font-medium text-sm py-1 px-3 rounded-full opacity-70"
            >
              {tag}
            </Link>
          ))}
        </div>
        <Link href={`/blogs/${props._id}`} className="hover:underline">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl mb-4">
            {props.title}
          </h1>
        </Link>
        <p className="max-w-[524px] text-sm xl:text-base">
          {props.metaDescription.substring(0, 130)}
          {props.metaDescription.length > 130 ? "..." : ""}
        </p>
        <div className="flex items-center gap-2.5 mt-5">
          <Link
            href={`/blogs/author/${props.author.id}`}
            className="flex items-center gap-3 hover:underline"
          >
            <div className="flex w-6 h-6 rounded-full overflow-hidden">
              <img
                src={props.author.avatar}
                alt="user"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <p className="text-sm">
              {props.author.firstName} {props.author.lastName}
            </p>
          </Link>
          <span className="flex w-[3px] h-[3px] rounded-full bg-gray-300" />
          <p className="text-sm">
            {new Date(props.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrimaryBlogCard;
