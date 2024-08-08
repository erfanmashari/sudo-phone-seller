import EditOrder from "./EditOrder";

// types
import OrderType from "@/types/Order.type";

type EditProps = {
  order: OrderType;
};

const Edit = ({ order }: EditProps) => {
  return (
    <main className="w-full flex-col px-12 py-6">
      <EditOrder order={order} />
    </main>
  );
};

export default Edit;
