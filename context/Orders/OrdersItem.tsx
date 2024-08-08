import Link from "next/link";
import { getSellerId } from "@/functions";

import { AiTwotoneEdit } from "react-icons/ai";

// types
import OrderType from "@/types/Order.type";

type OrdersItemProps = {
  index: number;
  order: OrderType;
  ordersList: OrderType[];
};

const OrdersItem = ({ index, order, ordersList }: OrdersItemProps) => {
  let totalPrice = 0;
  for (const product of order.products) {
    if (getSellerId() === product.seller) {
      totalPrice += product.price * product.number;
    }
  }

  return (
    <>
      <tr
        key={index}
        className={`${
          ordersList.length === index + 1 ? "border-none" : "border-b"
        } border-gray-400`}
      >
        <td className="py-3">
          <span className="w-fit block mx-auto text-blue-600">{index + 1}</span>
        </td>
        <td className="py-3 text-slate-800 text-xl font-bold">
          {order.address.province}
        </td>
        <td className="py-3 text-slate-800 text-xl font-bold">
          {order.address.city}
        </td>
        <td className="py-3 text-slate-800 text-xl font-bold">
          {order.status}
        </td>
        <td className="py-3 text-slate-800 text-xl font-bold">{totalPrice}</td>
        <td className="py-3">
          <Link href={`/orders/edit/${order._id}`} className="block mx-auto">
            <AiTwotoneEdit className="w-6 h-6 text-slate-600" />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default OrdersItem;
