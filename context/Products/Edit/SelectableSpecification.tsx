import Input from "@/components/Form/Input";
import Toggle from "@/components/Form/Toggle";

import { MdDelete } from "react-icons/md";

import Category from "@/types/Category";

type SelectableSpecificationType = {
  color: string;
  insurance: string;
  warranty: string;
  size: string;
  price: number;
  numberOfProducts: number;
  discountPercent: number;
  discountedPrice: number;
  discountTime: string;
  isAvailable: boolean;
  isHidden: boolean;
  isFreeDelivery: boolean;
  testAtHome: boolean;
  seller: string;
};

type SelectableSpecificationsProps = {
  index: number;
  category: Category;
  spec: SelectableSpecificationType;
  selectableSpecifications: SelectableSpecificationType[];
  changeFormFields: (
    parameter: string,
    value: string | boolean | object
  ) => void;
};

const SelectableSpecification = ({
  index,
  category,
  spec,
  selectableSpecifications,
  changeFormFields,
}: SelectableSpecificationsProps) => {
  const cateogrySpec = category.selectableSpecifications
    ? category.selectableSpecifications
    : {
        colors: false,
        sizes: false,
        warranties: false,
        insurances: false,
      };

  // chagne value of selectable specifications
  const changeValue = (parameter: string, value: string | boolean) => {
    const newSelectableSpecifications: any[] = [...selectableSpecifications];
    newSelectableSpecifications[index][parameter] = value;
    changeFormFields("selectableSpecifications", newSelectableSpecifications);
  };

  return (
    <>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          disabled={!cateogrySpec.colors}
          parameter="color"
          value={spec.color}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          disabled={!cateogrySpec.sizes}
          parameter="size"
          value={spec.size}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          disabled={!cateogrySpec.insurances}
          parameter="insurance"
          value={spec.insurance}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          disabled={!cateogrySpec.warranties}
          parameter="warranty"
          value={spec.warranty}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          type="number"
          parameter="numberOfProducts"
          value={spec.numberOfProducts}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          type="number"
          parameter="price"
          value={spec.price}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          type="number"
          parameter="discountPercent"
          value={spec.discountPercent}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          type="number"
          parameter="discountedPrice"
          value={spec.discountedPrice}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Input
          type="date"
          parameter="discountTime"
          value={spec.discountTime}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Toggle
          parameter="isAvailable"
          checked={spec.isAvailable}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Toggle
          parameter="isFreeDelivery"
          checked={spec.isFreeDelivery}
          changeValue={changeValue}
        />
      </li>
      <li className="w-32 sm:w-1/12 flex justify-center items-center">
        <Toggle
          parameter="isHidden"
          checked={spec.isHidden}
          changeValue={changeValue}
        />
      </li>
    </>
  );
};

export default SelectableSpecification;
