import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import FormErrorLine from "./form-error-line";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register: UseFormRegister<any>;
  inputKey: string;
  label: string;
  containerClassName?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const TextareaWithErrorField = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      inputKey,
      register,
      label,
      className,
      containerClassName,
      error,
      ...props
    },
    _
  ) => {
    return (
      <div className={twMerge("w-full group", containerClassName)}>
        <label htmlFor={inputKey} className="text-xs font-semibold px-1">
          {label}
        </label>
        <textarea
          {...register(inputKey)}
          className={twMerge(
            "w-full px-3 py-1.5 text-sm rounded-sm outline-none border focus:border-indigo-500 group-hover:scale-[1.01] transition-transform",
            className
          )}
          {...props}
        />
        {error && <FormErrorLine error={error} />}
      </div>
    );
  }
);

export default TextareaWithErrorField;
