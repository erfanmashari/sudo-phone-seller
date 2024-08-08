import Image from "./Image.type";
import FixedSpecification from "./FixedSpecification.type";

type Product = {
  _id?: string;
  id: string;
  nameFa?: string;
  nameEn?: string;
  model?: string;
  description?: string;
  brand?: string;
  category?: string;
  selectableSpecifications:
    | [
        {
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
        }
      ]
    | [];
  images?: Image[];
  newImages?: Image[];
  isOriginal?: boolean;
  features?: string[];
  fixedSpecifications?: any[];
  seller?: string;
};

export default Product;
