import AddressType from "./Address";
import Product from "./Product.type";

type OrderType = {
  _id: string;
  address: AddressType;
  totalPrice: number;
  status: string; // جاری - بسته بندی - ارسال شده - مرجوع شده - لغو شده
  sendingMethod: string; // پست پیشتاز
  products: [
    {
      status: string;
      product: Product;
      selectedIndex: number;
      number: number;
      price: number;
      _id: string;
      seller: string;
    }
  ];
};

export default OrderType;
