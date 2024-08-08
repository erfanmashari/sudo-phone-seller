"use client";

// import FieldContainer from "@/components/Form/FieldContainer";
// import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
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

const AddProduct = () => {
  // form fields state
  const [formFields, setFormFields] = useState<Product>({
    id: "",
    selectableSpecifications: [],
    seller: "",
  });
  // categories and brands list
  const [productsList, setProductsList] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [brandsList, setBrandsList] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  // contain uploaded images
  // const [images, setImages] = useState<any>([]);
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

  // get products list
  const getProducts = () => {
    axiosApp
      .get("products", {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        setProducts(res.data.products);
        if (res.ok) {
          const newProductsList = [{ value: "", text: "محصولات" }];
          for (const product of res.data.products) {
            newProductsList.push({
              value: product._id,
              text: product.nameFa,
            });
          }
          setProductsList(newProductsList);
        }
      });
  };

  // get categories list
  const getCategories = () => {
    axiosApp
      .get("categories", {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          const newCategoriesList = [{ value: "", text: "دسته بندی" }];
          for (const category of res.data.categories) {
            if (!category.isSubCategoryAllowed) {
              newCategoriesList.push({
                value: category._id,
                text: category.nameFa,
              });
            }
          }
          setCategoriesList(newCategoriesList);
        }
      });
  };

  // get brands list
  const getBrands = () => {
    axiosApp
      .get("brands", {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          const newBrandsList = [{ value: "", text: "برند" }];
          for (const brand of res.data.brands) {
            newBrandsList.push({
              value: brand._id,
              text: brand.nameFa,
            });
          }
          setBrandsList(newBrandsList);
        }
      });
  };

  // change category and fetch its data
  const changeCategory = (parameter: string, id: string) => {
    // change form field value
    changeFormFields(parameter, id);

    if (id) {
      for (const product of products) {
        if (product._id === id) {
          // fetch category data
          axiosApp
            .get(`categories/${product.category}`, {
              headers: { Authorization: getTokenFromCookie() },
            })
            .then((response) => {
              const res = checkFetchResponse(response);
              if (res.ok) {
                setCategory(res.data.category);
              }
            });
        }
      }
    }
  };

  useEffect(() => {
    getProducts();

    // set defaut value for form foelds
    changeFormFields("seller", getSellerId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // send add product request to backend
  const sendAddProductRequest = (e: FormEvent) => {
    e.preventDefault();

    // create request form data
    // const formData = new FormData();
    // const formFieldsData: any = { ...formFields };
    // for (const field in formFieldsData) {
    //   if (field === "images") {
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
      .post("products/spec", formFields, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <form
      onSubmit={sendAddProductRequest}
      className="w-full flex flex-col gap-3"
    >
      <Select
        label="محصول مورد نظر"
        options={productsList}
        parameter="id"
        required={true}
        value={formFields.id}
        changeValue={changeCategory}
      />
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
        افزودن محصول
      </button>
    </form>
  );
};

export default AddProduct;
