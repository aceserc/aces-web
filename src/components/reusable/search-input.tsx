import { cn } from "@/helpers/cn";
import { IoSearchOutline } from "react-icons/io5";
type ISearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ className, ...props }: ISearchInputProps) => {
  return (
    <label className="flex items-center border border-muted-foreground/20 gap-4 overflow-hidden !outline-none text-muted-foreground w-80 px-4 py-2.5 rounded-xl">
      <IoSearchOutline className="min-w-5 min-h-5" />
      <input
        type="text"
        className={cn("text-base outline-none font-medium w-64", className)}
        {...props}
      />
    </label>
  );
};
export default SearchInput;
