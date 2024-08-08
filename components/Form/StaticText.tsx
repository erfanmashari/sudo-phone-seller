import React from "react";

type StaticTextProps = {
  width?: string;
  label: string;
  value: string | number;
};

const StaticText = ({ width, label, value }: StaticTextProps) => {
  return (
    <div className={`${width ? width : "w-full"} flex flex-col gap-2`}>
      {label ? <label className="text-lg font-bold text-gray-600">{label}</label> : ""}
      <span>{value}</span>
    </div>
  );
};

export default StaticText;
