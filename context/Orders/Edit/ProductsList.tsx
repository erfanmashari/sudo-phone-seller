"use client";

import ProductsItem from "./ProductsItem";
import Input from "@/components/Form/Input";

import { useState, useEffect } from "react";

// types
import Product from "@/types/Product.type";
import axiosApp from "@/utils/axiosApp.util";
import {
  checkFetchResponse,
  getTokenFromCookie,
  toastAlert,
} from "@/functions";

type OrderProductType = {
  status: string;
  product: Product;
  selectedIndex: number;
  number: number;
  price: number;
  _id: string;
  seller: string;
};

type ProductsList = {
  orderId: string;
  products: OrderProductType[];
};

const ProductsList = ({ orderId, products }: ProductsList) => {
  // set satte for products list
  const [productsList, setProductsList] = useState<any>([]);
  const [postalTrackingCode, setPostalTrackingCode] = useState<string>("");

  const changeProductStatus = (
    parameter: string,
    value: string,
    index: number
  ) => {
    const newProductsList = [...productsList];
    newProductsList[index].status = value;
    setProductsList(newProductsList);
  };

  // send update products status rrequest to backend
  const sendUpdateProductsStatus = () => {
    axiosApp
      .put(
        "orders/seller",
        { order: orderId, products: productsList, postalTrackingCode },
        { headers: { Authorization: getTokenFromCookie()! } }
      )
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          setProductsList(res.data.products);
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  const changePostalTrackingCode = (parameter: string, value: string) => {
    setPostalTrackingCode(value);
  };

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  return (
    <>
      <div className="w-full flex flex-row justify-center items-center gap-12 mb-3">
        <label>کد رهگیری مرسوله پستی</label>
        <Input
          width="w-3/12"
          parameter="postalTrackingCode"
          placeholder="کد رهگیری مرسوله پستی"
          value={postalTrackingCode}
          changeValue={changePostalTrackingCode}
        />
      </div>
      <ul className="w-full flex flex-col border border-gray-600 rounded-lg p-4 gap-3">
        <li className="w-full flex flex-row justify-center items-center text-gray-600 font-bold text-center">
          <span className="w-6/12">نام محصول</span>
          <span className="w-1/12">رنگ</span>
          <span className="w-1/12">اندازه</span>
          <span className="w-1/12">تعداد</span>
          <span className="w-1/12">مدل</span>
          <span className="w-1/12">قیمت</span>
          <span className="w-1/12">وضعیت</span>
        </li>
        {productsList.map((product: OrderProductType, index: number) => (
          <ProductsItem
            key={index}
            orderProduct={product}
            changeProductStatus={(parameter, value) =>
              changeProductStatus(parameter, value, index)
            }
          />
        ))}
      </ul>
      <div className="w-full flex justify-center items-center">
        <button
          type="button"
          onClick={sendUpdateProductsStatus}
          className="w-fit text-stone-900 border-2 self-center border-stone-900 rounded-lg py-1.5 px-4"
        >
          ویرایش وضعیت محصولات
        </button>
      </div>
    </>
  );
};

export default ProductsList;
