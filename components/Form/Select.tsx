import React from "react";

type Options = { text: string; value: string };

type SelectProps = {
  width?: number;
  label?: string;
  required?: boolean;
  options: Options[];
  value: string;
  parameter: string;
  changeValue: (parameter: string, value: string) => void;
};

const Select = ({
  width = 100,
  label,
  required,
  options = [],
  value,
  parameter,
  changeValue,
}: SelectProps) => {
  return (
    <div style={{ width: `${width}%` }} className="flex flex-col gap-2">
      <label className="text-gray-600">
        {label} {required ? "*" : ""}
      </label>
      <select
        className="w-full border border-gray-600 rounded-lg py-1.5 px-3"
        required={required}
        value={value}
        onChange={(e) => changeValue(parameter, e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
