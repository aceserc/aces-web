import { twJoin, twMerge } from "tailwind-merge";
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  placeholder: string;
  containerClassName?: string;
};

const ElevatedTextArea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, placeholder, containerClassName, ...props }, ref) => {
    return (
      <div className={twJoin("relative", containerClassName)}>
        <textarea
          id={placeholder?.replace(/\s/g, "")}
          className={twMerge(
            "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            className
          )}
          ref={ref}
          {...props}
          placeholder=" "
        />
        <label
          htmlFor={placeholder.replace(/\s/g, "")}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {placeholder}
        </label>
      </div>
    );
  }
);

export default ElevatedTextArea;
