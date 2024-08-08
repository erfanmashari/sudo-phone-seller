"use client";

// import FieldContainer from "@/components/Form/FieldContainer";
// import Input from "@/components/Form/Input";
// import Select from "@/components/Form/Select";
// import Toggle from "@/components/Form/Toggle";
// import TextArea from "@/components/Form/TextArea";
import SelectableSpecifications from "./SelectableSpecifications";
// import Images from "./Images";
// import Features from "./Features";
// import FixedSpecifications from "./FixedSpecifications";

import { useState, useEffect, FormEvent } from "react";

import axiosApp from "@/utils/axiosApp.util";
import {
  getTokenFromCookie,
  checkFetchResponse,
  getSellerId,
  toastAlert,
} from "@/functions";

// types
import Product from "@/types/Product.type";
import ProductFixedSpecificationType from "@/types/ProductFixedSpecification";

type EditProductProps = {
  product: Product;
};

const EditProduct = ({ product }: EditProductProps) => {
  // form fields state
  const [formFields, setFormFields] = useState<Product>({
    id: "",
    selectableSpecifications: [],
    seller: "",
  });
  // selected category info
  const [category, setCategory] = useState<any>({});

  // change form fields values
  const changeFormFields = (
    paramter: string,
    value: string | boolean | object | ProductFixedSpecificationType[]
  ) => {
    const newFormFields: any = { ...formFields };
    newFormFields[paramter] = value;
    setFormFields(newFormFields);
  };

  // fetch category data
  const fetchCategoryData = (id: string) => {
    // fetch category data
    axiosApp
      .get(`categories/${id}`, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          setCategory(res.data.category);
        }
      });
  };

  useEffect(() => {
    // set defaut value for form foelds
    setFormFields({
      ...product,
      id: product._id!,
      seller: getSellerId(),
    });

    if (product.category) {
      fetchCategoryData(product.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // send add product request to backend
  const sendEditProductRequest = (e: FormEvent) => {
    e.preventDefault();

    // create request form data
    // const formData = new FormData();
    // const formFieldsData: any = { ...formFields };
    // formData.append("id", formFields._id!);
    // for (const field in formFieldsData) {
    //   if (field === "newImages") {
    //     for (const img of images) {
    //       formData.append("imagesFiles", img);
    //     }
    //   }
    //   formData.append(
    //     field,
    //     typeof formFieldsData[field] === "object"
    //       ? JSON.stringify(formFieldsData[field])
    //       : formFieldsData[field]
    //   );
    // }

    axiosApp
      .put("products/spec", formFields, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          toastAlert(res.data.message, "success");

          // set defaut value for form foelds
          setFormFields({
            ...res.data.product,
            id: product._id,
            seller: getSellerId(),
          });
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <form
      onSubmit={sendEditProductRequest}
      className="w-full flex flex-col gap-3"
    >
      {/* <FieldContainer>
        <Input
          label="نام فارسی محصول"
          placeholder="نام فارسی محصول"
          parameter="nameFa"
          required={true}
          value={formFields.nameFa}
          changeValue={changeFormFields}
        />
        <Input
          label="نام انگلیسی محصول"
          placeholder="نام انگلیسی محصول"
          parameter="nameEn"
          required={true}
          value={formFields.nameEn}
          changeValue={changeFormFields}
        />
        <Select
          label="دسته بندی"
          options={categoriesList}
          parameter="category"
          required={true}
          value={formFields.category}
          changeValue={changeCategory}
        />
      </FieldContainer>
      <FieldContainer>
        <Select
          label="برند"
          options={brandsList}
          parameter="brand"
          required={true}
          value={formFields.brand}
          changeValue={changeFormFields}
        />
        <Input
          label="مدل"
          placeholder="مدل"
          parameter="model"
          value={formFields.model}
          changeValue={changeFormFields}
        />
        <Toggle
          label="اصل بودن محصول"
          parameter="isOriginal"
          checked={formFields.isOriginal}
          changeValue={changeFormFields}
        />
      </FieldContainer>
      <TextArea
        label="توضیحات"
        placeholder="توضیحات"
        parameter="description"
        value={formFields.description}
        changeValue={changeFormFields}
      /> */}
      <SelectableSpecifications
        category={category}
        selectableSpecifications={formFields.selectableSpecifications}
        changeFormFields={changeFormFields}
      />
      {/* <FieldContainer>
        <Images
          images={images}
          setImages={setImages}
          formFields={formFields}
          changeFormFields={changeFormFields}
        />
        <Features
          features={formFields.features}
          changeFormFields={changeFormFields}
        />
      </FieldContainer>
      <FixedSpecifications
        fixedSpecifications={formFields.fixedSpecifications}
        category={category}
        changeFormFields={changeFormFields}
      /> */}
      <button
        type="submit"
        className="w-fit text-stone-900 border-2 self-center border-stone-900 rounded-lg py-1.5 px-4"
      >
        ویرایش محصول
      </button>
    </form>
  );
};

export default EditProduct;
