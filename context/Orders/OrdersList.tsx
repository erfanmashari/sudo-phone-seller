"use client";

import OrdersItem from "./OrdersItem";

import { useState, useEffect } from "react";

import axiosApp from "@/utils/axiosApp.util";
import {
  checkFetchResponse,
  getSellerId,
  getTokenFromCookie,
} from "@/functions";

// types
import OrderType from "@/types/Order.type";

const OrdersList = () => {
  // products list state
  const [ordersList, setOrdersList] = useState<OrderType[]>([]);

  // get products from backend
  const getOrdersFromBackend = () => {
    axiosApp(`orders/seller?seller=${getSellerId()}`, {
      headers: { Authorization: getTokenFromCookie() },
    }).then((response) => {
      const res = checkFetchResponse(response);
      if (res.ok) {
        setOrdersList(res.data.sales);
      }
    });
  };

  useEffect(() => {
    getOrdersFromBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table className="w-full text-gray-600 p-4">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="w-1/12 py-3">ردیف</th>
            <th className="w-3/12 py-3">استان</th>
            <th className="w-3/12 py-3">شهرستان</th>
            <th className="w-2/12 py-3">وضعیت سفارش</th>
            <th className="w-2/12 py-3">قیمت کل</th>
            <th className="w-1/12 py-3">اطلاعات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
          {ordersList.map((order, index) => (
            <OrdersItem
              key={index}
              index={index}
              order={order}
              ordersList={ordersList}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrdersList;
