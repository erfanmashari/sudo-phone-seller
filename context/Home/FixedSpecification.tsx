import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import TextArea from "@/components/Form/TextArea";
import SpecsList from "./SpecsList";

import { useState } from "react";

// types
import FixedSpecification from "@/types/FixedSpecification.type";
import ProductFixedSpecificationType from "@/types/ProductFixedSpecification";

type FixedSpecificationProps = {
  fixedSpecifications: ProductFixedSpecificationType[];
  spec: FixedSpecification;
  index: number;
  changeFormFields: (
    parameter: string,
    value: string | boolean | string[] | ProductFixedSpecificationType[]
  ) => void;
};

const FixedSpecification = ({
  fixedSpecifications,
  spec,
  index,
  changeFormFields,
}: FixedSpecificationProps) => {
  // state for value of inputs
  const [inputValue, setInputValue] = useState<string>("");

  // get values list
  let valuesList: string[] = [];
  for (const specItem of fixedSpecifications) {
    if (specItem.label === spec.nameFa && spec.multiple) {
      valuesList = Array.isArray(specItem.values) ? specItem.values : [];
    }
  }

  const changeValue = (
    parameter: string,
    value: string,
    spec: FixedSpecification
  ) => {
    setInputValue(value);
    const newFixedSpecifications = [...fixedSpecifications];
    let isSpecExist = false;
    for (const specItem of newFixedSpecifications) {
      if (specItem.label === spec.nameFa) {
        isSpecExist = true;
        if (!spec.multiple && value) {
          specItem.values = value;
        }
      }
    }
    if (!isSpecExist && !spec.multiple) {
      newFixedSpecifications.push({
        label: spec.nameFa,
        values: value,
      });
    }
    changeFormFields("fixedSpecifications", newFixedSpecifications);
  };

  const options = [];
  if (spec.options) {
    for (const option of spec.options!) {
      options.push({ text: option, value: option });
    }
  }

  const addValue = () => {
    let isSpecExist = false;
    const newFixedSpecifications = [...fixedSpecifications];
    for (const specItem of fixedSpecifications) {
      if (specItem.label === spec.nameFa) {
        isSpecExist = true;
        if (spec.multiple) {
          const newValues = Array.isArray(specItem.values)
            ? [...specItem.values]
            : [];
            
          if (!newValues.includes(inputValue)) {
            newValues.push(inputValue);
            specItem.values = newValues;
          }
        }
      }
    }

    if (!isSpecExist && spec.multiple) {
      newFixedSpecifications.push({
        label: spec.nameFa,
        values: [inputValue],
      });
    }

    changeFormFields("fixedSpecifications", newFixedSpecifications);
  };

  return (
    <>
      <div className="w-6/12 flex flex-row jusctify-between items-end gap-3">
        {spec.inputType === "input" ? (
          <Input
            key={index}
            required={spec.multiple ? false : spec.isRequired}
            label={spec.nameFa}
            placeholder={spec.placeholder}
            value={inputValue}
            parameter={spec.nameFa}
            changeValue={(parameter, value) =>
              changeValue(parameter, value, spec)
            }
          />
        ) : spec.inputType === "select" ? (
          <Select
            key={index}
            width={50}
            required={spec.multiple ? false : spec.isRequired}
            label={spec.nameFa}
            value=""
            parameter={spec.nameFa}
            options={options}
            changeValue={(parameter, value) =>
              changeValue(parameter, value, spec)
            }
          />
        ) : (
          <TextArea
            key={index}
            required={spec.multiple ? false : spec.isRequired}
            label={spec.nameFa}
            placeholder={spec.placeholder}
            value=""
            parameter={spec.nameFa}
            changeValue={(parameter, value) =>
              changeValue(parameter, value, spec)
            }
          />
        )}
        {spec.multiple ? (
          <button
            type="button"
            onClick={addValue}
            className="w-12 h-10 text-white border border-gray-600 bg-slate-400 rounded-lg"
          >
            +
          </button>
        ) : (
          ""
        )}
      </div>
      {spec.multiple ? (
        <SpecsList
          width={spec.inputType === "textarea" ? 100 : 50}
          list={valuesList}
          spec={spec}
          fixedSpecifications={fixedSpecifications}
          changeFormFields={changeFormFields}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default FixedSpecification;
