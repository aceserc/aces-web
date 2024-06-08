import { MoonLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "w-full h-full flex items-center justify-center",
        className
      )}
    >
      <MoonLoader color="#000" size={30} />
    </div>
  );
};
export default Loading;
