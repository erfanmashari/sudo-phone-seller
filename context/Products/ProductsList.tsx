"use client";

import ProductsItem from "./ProductsItem";

import { useState, useEffect } from "react";

import axiosApp from "@/utils/axiosApp.util";
import {
  checkFetchResponse,
  getSellerId,
  getTokenFromCookie,
} from "@/functions";

// types
import Product from "@/types/Product.type";

const ProductsList = () => {
  // products list state
  const [productsList, setProductsList] = useState<Product[]>([]);

  // get products from backend
  const getProductsFromBackend = () => {
    axiosApp(`products/seller?seller=${getSellerId()}`, {
      headers: { Authorization: getTokenFromCookie() },
    }).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
        setProductsList(res.data.products);
      }
    });
  };

  useEffect(() => {
    getProductsFromBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table className="w-full text-gray-600 p-4">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="w-1/12 py-3">ردیف</th>
            <th className="w-10/12 py-3">نام محصول</th>
            <th className="w-1/12 py-3">ویرایش</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
          {productsList.map((product, index) => (
            <ProductsItem
              key={index}
              index={index}
              product={product}
              productsList={productsList}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductsList;
