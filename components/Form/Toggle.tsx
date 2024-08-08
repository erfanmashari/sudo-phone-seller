import { ToggleSwitch } from "flowbite-react";

type ToggleProps = {
  width?: number;
  label?: string;
  checked: boolean;
  parameter: string;
  changeValue: (parameter: string, value: boolean) => void;
};

const Toggle = ({
  width = 100,
  label,
  checked,
  parameter,
  changeValue,
}: ToggleProps) => {
  // change toggle checked status
  const changeToggle = (checked: boolean) => {
    changeValue(parameter, checked);
  };

  return (
    <div
      style={{ width: `${width}%` }}
      className={`flex flex-row ${
        label ? "justify-between" : "justify-center"
      } items-center gap-2`}
    >
      {label ? <label className="text-gray-600">{label}</label> : ""}
      <ToggleSwitch
        checked={checked}
        label=""
        dir="ltr"
        onChange={changeToggle}
      />
    </div>
  );
};

export default Toggle;
