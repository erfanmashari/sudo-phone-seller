import React from "react";

type TextAreaProps = {
  width?: number;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  parameter: string;
  changeValue: (parameter: string, value: string) => void;
};

const TextArea = ({
  width = 100,
  label,
  placeholder = "",
  required,
  value,
  parameter,
  changeValue,
}: TextAreaProps) => {
  return (
    <div style={{ width: `${width}%` }} className="flex flex-col gap-2">
      <label className="text-gray-600">
        {label} {required ? "*" : ""}
      </label>
      <textarea
        rows={6}
        className="w-full border border-gray-600 rounded-lg py-1.5 px-3"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => changeValue(parameter, e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextArea;
