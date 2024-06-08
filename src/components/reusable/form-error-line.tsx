import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};
const FormErrorLine = ({ children, error, className, ...props }: Props) => {
  return (
    <div
      className={twMerge("text-xs text-destructive w-full", className)}
      {...props}
    >
      {error as string}
    </div>
  );
};
export default FormErrorLine;
