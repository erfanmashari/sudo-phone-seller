import FixedSpecification from "@/types/FixedSpecification.type";
import ProductFixedSpecificationType from "@/types/ProductFixedSpecification";
import { MdDelete } from "react-icons/md";

type SpecsListProps = {
  width: number;
  list: string[];
  spec: FixedSpecification;
  fixedSpecifications: ProductFixedSpecificationType[];
  changeFormFields: (
    parameter: string,
    value: string | boolean | string[] | ProductFixedSpecificationType[]
  ) => void;
};

const SpecsList = ({
  width,
  list,
  spec,
  fixedSpecifications,
  changeFormFields,
}: SpecsListProps) => {
  // delete spec from list
  const deleteSpecification = (index: number) => {
    const newFixedSpecifications = [...fixedSpecifications];
    for (const specItem of fixedSpecifications) {
      if (specItem.label === spec.nameFa) {
        if (spec.multiple) {
          const newValues = Array.isArray(specItem.values)
            ? [...specItem.values]
            : [];
          newValues.splice(index, 1);
          specItem.values = newValues;
        }
      }
    }

    changeFormFields("fixedSpecifications", newFixedSpecifications);
  };

  return (
    <ul
      style={{ width: `${width}%` }}
      className="h-28 flex flex-col border border-gray-600 rounded-lg overflow-y-scroll gap-4 p-4"
    >
      {list.map((item, index) => (
        <li
          key={index}
          className="w-full flex flex-row justify-between items-center"
        >
          <p>{item}</p>
          <button type="button" onClick={() => deleteSpecification(index)}>
            <MdDelete className="w-6 h-6 text-red-600" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SpecsList;
