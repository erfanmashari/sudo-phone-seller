import { useState } from "react";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

type PasswordInputProps = {
  width?: number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  parameter: string;
  changeValue: (parameter: string, value: string) => void;
};

const PasswordInput = ({
  width = 100,
  label,
  placeholder = "",
  required,
  value,
  parameter,
  changeValue,
}: PasswordInputProps) => {
  // password hidden status
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <div style={{ width: `${width}%` }} className="flex flex-col gap-2">
      {label ? (
        <label className="text-gray-600">
          {label} {required ? "*" : ""}
        </label>
      ) : (
        ""
      )}
      <div className="w-full flex flex-row border border-gray-600 rounded-lg overflow-hidden gap-2">
        <input
          className="w-11/12 border-none outline-none py-1.5 px-3"
          type={isPasswordHidden ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => changeValue(parameter, e.target.value)}
        />
        <button
          type="button"
          className="w-1/12"
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
        >
          {isPasswordHidden ? (
            <BsEyeFill className="w-5 h-5 text-gray-600" />
          ) : (
            <BsEyeSlashFill className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
