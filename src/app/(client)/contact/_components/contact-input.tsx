import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import FormErrorLine from "@/components/reusable/form-error-line";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register: UseFormRegister<any>;
  inputKey: string;
  label: string;
  containerClassName?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const ContactInput = React.forwardRef<HTMLInputElement, Props>(
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
        <label htmlFor={inputKey} className="text-base font-medium px-1">
          {label}
        </label>
        <input
          {...register(inputKey)}
          className={twMerge(
            "w-full px-3 py-1.5 text-base rounded-md outline-none border focus:border-indigo-500 group-hover:scale-[1.005] transition-transform",
            className
          )}
          {...props}
        />
        {error && <FormErrorLine error={error} />}
      </div>
    );
  }
);

export default ContactInput;
