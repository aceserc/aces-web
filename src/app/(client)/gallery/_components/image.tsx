import { Badge } from "@/components/ui/badge";
import { cn } from "@/helpers/cn";
type ImageProps = {
  src: string;
  title: string;
  onClick: (index: number) => void;
  index: number;
  className?: string;
  currentIndex: number;
};

const Image = ({
  src,
  title,
  onClick,
  index,
  className,
  currentIndex,
}: ImageProps) => {
  return (
    <div
      onClick={() => onClick(index + currentIndex * 4)}
      role="button"
      className={cn(
        "rounded-md overflow-hidden flex items-center justify-center relative group",
        className
      )}
    >
      <Badge className="absolute top-2 left-2 scale-0 group-hover:scale-100 transition-all">
        {title}
      </Badge>
      <img
        src={src}
        alt={title}
        className="object-cover object-center w-full h-full rounded-md border border-gray-200 shadow-inner"
      />
    </div>
  );
};

export default Image;
