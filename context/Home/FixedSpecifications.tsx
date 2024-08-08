import FixedSpecificationItem from "./FixedSpecification";

// types
import FixedSpecification from "@/types/FixedSpecification.type";
import Category from "@/types/Category";
import ProductFixedSpecificationType from "@/types/ProductFixedSpecification";

type FixedSpecificationsProps = {
  fixedSpecifications: ProductFixedSpecificationType[];
  category: Category;
  changeFormFields: (
    parameter: string,
    value: string | boolean | string[] | ProductFixedSpecificationType[]
  ) => void;
};

const FixedSpecifications = ({
  fixedSpecifications,
  category,
  changeFormFields,
}: FixedSpecificationsProps) => {
  const specs = category.fixedSpecifications
    ? category.fixedSpecifications
    : [];

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl text-gray-600">مشخصات ثابت</h3>
      {specs.map((spec, index) => (
        <FixedSpecificationItem
          key={index}
          fixedSpecifications={fixedSpecifications}
          spec={spec}
          index={index}
          changeFormFields={changeFormFields}
        />
      ))}
    </div>
  );
};

export default FixedSpecifications;
