import FixedSpecification from "./FixedSpecification.type";
import SelectableSpecifications from "./SelectableSpecifications.type";

type Category = {
  nameFa: string;
  nameEn: string;
  higherCategoryId: string;
  fee: number;
  classification: number;
  isSubCategoryAllowed: boolean;
  subCategories: string;
  selectableSpecifications: SelectableSpecifications;
  fixedSpecifications: FixedSpecification[];
};

export default Category;
