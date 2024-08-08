import Select from "@/components/Form/Select";

// types
import Product from "@/types/Product.type";

type ProductsItemProps = {
  orderProduct: {
    status: string;
    product: Product;
    selectedIndex: number;
    number: number;
    price: number;
    _id: string;
    seller: string;
  };
  changeProductStatus: (parameter: string, value: string) => void;
};

const ProductsItem = ({
  orderProduct,
  changeProductStatus,
}: ProductsItemProps) => {
  return (
    <li className="w-full flex flex-row justify-center items-center text-center">
      <span className="w-6/12 text-right">{orderProduct.product.nameFa}</span>
      <span className="w-1/12">
        {
          orderProduct.product.selectableSpecifications[
            orderProduct.selectedIndex
          ].color
        }
      </span>
      <span className="w-1/12">
        {orderProduct.product.selectableSpecifications[
          orderProduct.selectedIndex
        ].size
          ? orderProduct.product.selectableSpecifications[
              orderProduct.selectedIndex
            ].size
          : "ندارد"}
      </span>
      <span className="w-1/12">{orderProduct.number}</span>
      <span className="w-1/12">{orderProduct.product.model}</span>
      <span className="w-1/12">{orderProduct.price} تومان</span>
      {/* <div className="w-1/12">{orderProduct.status}</div> */}
      <div className="w-1/12">
        <Select
          options={[
            { text: "جاری", value: "جاری" },
            { text: "بسته بندی", value: "بسته بندی" },
            { text: "ارسال شده", value: "ارسال شده" },
            { text: "مرجوع شده", value: "مرجوع شده" },
            { text: "لغو شده", value: "لغو شده" },
          ]}
          parameter="status"
          value={orderProduct.status}
          changeValue={changeProductStatus}
        />
      </div>
    </li>
  );
};

export default ProductsItem;
