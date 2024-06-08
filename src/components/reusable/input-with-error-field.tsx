import React from "react";
import { UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import FormErrorLine from "./form-error-line";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register: UseFormRegister<any>;
  inputKey: string;
  label: string;
  icon: any;
  containerClassName?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const InputWithErrorField = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      inputKey,
      register,
      label,
      icon: Icon,
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
        <div className="flex items-center rounded-lg border-2 border-gray-200 bg-gray-100/70 group-hover:scale-[1.01] transition-transform">
          <Icon className="pointer-events-none w-5 h-5 mx-3" />
          <input
            {...register(inputKey)}
            className={twMerge(
              "w-full px-3 py-2 outline-none border focus:border-indigo-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <FormErrorLine error={error} />}
      </div>
    );
  }
);

export default InputWithErrorField;
