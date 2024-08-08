import React from "react";

type InputProps = {
  width?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  value: string | number;
  parameter: string;
  changeValue: (parameter: string, value: string) => void;
};

const Input = ({
  width = "w-full",
  label,
  type = "text",
  placeholder = "",
  disabled,
  required,
  value,
  parameter,
  changeValue,
}: InputProps) => {
  return (
    <div className={`${width} flex flex-col gap-2`}>
      {label ? (
        <label className="text-gray-600">
          {label} {required ? "*" : ""}
        </label>
      ) : (
        ""
      )}
      <input
        className="w-full border border-gray-600 rounded-lg py-1.5 px-3"
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => changeValue(parameter, e.target.value)}
      />
    </div>
  );
};

export default Input;
