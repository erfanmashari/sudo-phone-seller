import Link from "next/link";

import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

// types
import Product from "@/types/Product.type";

type ProductsItemProps = {
  index: number;
  productsList: Product[];
  product: Product;
};

const ProductsItem = ({ index, productsList, product }: ProductsItemProps) => {
  return (
    <>
      <tr
        key={index}
        className={`${
          productsList.length === index + 1 ? "border-none" : "border-b"
        } border-gray-400`}
      >
        <td className="py-3">
          <span className="w-fit block mx-auto text-blue-600">{index + 1}</span>
        </td>
        <td className="py-3 text-slate-800 text-xl font-bold">
          {product.nameFa}
        </td>
        <td className="py-3">
          <Link
            href={`/products/edit/${product._id}`}
            className="block mx-auto"
          >
            <AiTwotoneEdit className="w-6 h-6 text-slate-600" />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default ProductsItem;
