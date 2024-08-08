import EditProduct from "./EditProduct";

// types
import Product from "@/types/Product.type";

type EditProps = {
  product: Product;
};

const Edit = ({ product }: EditProps) => {
  return (
    <main className="w-full flex-col px-12 py-6">
      <EditProduct product={product} />
    </main>
  );
};

export default Edit;
