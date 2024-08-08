"use client";

import SelectableSpecification from "./SelectableSpecification";

import { useEffect } from "react";

import { getSellerId } from "@/functions";

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
  selectableSpecifications: SelectableSpecificationType[];
  category: Category;
  changeFormFields: (
    parameter: string,
    value: string | boolean | object
  ) => void;
};

const SelectableSpecifications = ({
  selectableSpecifications,
  category,
  changeFormFields,
}: SelectableSpecificationsProps) => {
  // add new spec row
  const addNewRow = () => {
    const newSelectableSpecification: SelectableSpecificationType = {
      color: "",
      insurance: "",
      warranty: "",
      size: "",
      price: 0,
      numberOfProducts: 0,
      discountPercent: 0,
      discountedPrice: 0,
      discountTime: "",
      isAvailable: false,
      isHidden: false,
      isFreeDelivery: false,
      testAtHome: false,
      seller: getSellerId(),
    };

    const newSelectableSpecifications: any[] = [...selectableSpecifications];
    newSelectableSpecifications.push(newSelectableSpecification);
    changeFormFields("selectableSpecifications", newSelectableSpecifications);
  };

  return (
    // <div className="w-full flex flex-col gap-4">
    <div className="w-full relative flex flex-col border border-gray-600 rounded-lg overflow-x-scroll p-4 gap-2">
      <div className="w-full flex flex-row justify-between items-center">
        <label className="text-gray-600 text-xl">مشخصات قابل انتخاب</label>
        <button
          type="button"
          onClick={addNewRow}
          className="w-10 h-10 text-white border border-gray-600 bg-slate-400 rounded-lg"
        >
          +
        </button>
      </div>
      <ul className="w-max sm:w-full flex flex-row gap-4">
        <li className="w-32 sm:w-1/12 text-center">رنگ</li>
        <li className="w-32 sm:w-1/12 text-center">اندازه</li>
        <li className="w-32 sm:w-1/12 text-center">بیمه</li>
        <li className="w-32 sm:w-1/12 text-center">گارانتی</li>
        <li className="w-32 sm:w-1/12 text-center">تعداد محصول</li>
        <li className="w-32 sm:w-1/12 text-center">قیمت</li>
        <li className="w-32 sm:w-1/12 text-center">درصد تخفیف</li>
        <li className="w-32 sm:w-1/12 text-center">قیمت تخفیف خورده</li>
        <li className="w-32 sm:w-1/12 text-center">زمان تخفیف</li>
        <li className="w-32 sm:w-1/12 text-center">موجود بودن</li>
        <li className="w-32 sm:w-1/12 text-center">تحویل رایگان</li>
        <li className="w-32 sm:w-1/12 text-center">حذف</li>
      </ul>
      {selectableSpecifications.map((spec, index) => (
        <ul key={index} className="w-max sm:w-full flex flex-row gap-4">
          <SelectableSpecification
            index={index}
            category={category}
            spec={spec}
            selectableSpecifications={selectableSpecifications}
            changeFormFields={changeFormFields}
          />
        </ul>
      ))}
    </div>
    // </div>
  );
};

export default SelectableSpecifications;
