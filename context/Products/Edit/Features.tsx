import Input from "@/components/Form/Input";

import { useState } from "react";

import { toastAlert } from "@/functions";

import { MdDelete } from "react-icons/md";

type FeaturesProps = {
  features: string[];
  changeFormFields: (
    parameter: string,
    value: string | boolean | string[]
  ) => void;
};

const Features = ({ features, changeFormFields }: FeaturesProps) => {
  // feature state
  const [feature, setFeature] = useState("");

  // change feature value
  const changeFeatureValue = (parameter: string, value: string) => {
    setFeature(value);
  };

  // add new feature to list
  const addNewFeature = () => {
    if (!features.includes(feature)) {
      const newFeatures = [...features];
      newFeatures.push(feature);
      changeFormFields("features", newFeatures);
    } else {
      toastAlert("این ویژگی وجود دارد!", "error");
    }
  };

  // delete one fature
  const deleteFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    changeFormFields("features", newFeatures);
  };

  return (
    <div className="w-full sm:w-6/12 flex flex-col border border-gray-600 p-4 rounded-lg gap-4">
      <div className="w-full flex flex-row justify-between items-end gap-4">
        <Input
          label="ویژگی موردنظر"
          placeholder="نام ویژگی مورنظر"
          parameter="feature"
          value={feature}
          changeValue={changeFeatureValue}
        />
        <button
          type="button"
          onClick={addNewFeature}
          className="w-12 h-10 text-white border border-gray-600 bg-slate-400 rounded-lg"
        >
          +
        </button>
      </div>
      <ul className="w-full h-40 flex flex-col border border-gray-600 p-4 rounded-lg overflow-y-scroll">
        {features.map((feature, index) => (
          <li
            key={index}
            className="w-full flex flex-row justify-between items-center"
          >
            <p>{feature}</p>
            <button type="button" onClick={() => deleteFeature(index)}>
              <MdDelete className="w-6 h-6 text-red-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
