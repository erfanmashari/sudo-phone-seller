import FieldContainer from "@/components/Form/FieldContainer";
import StaticText from "@/components/Form/StaticText";
import ProductsList from "./ProductsList";

// types
import OrderType from "@/types/Order.type";

type EditOrderProps = {
  order: OrderType;
};

const EditOrder = ({ order }: EditOrderProps) => {
  return (
    <form className="w-full flex flex-col gap-3">
      <FieldContainer>
        <StaticText label="وضعیت سفارش" value={order.status} />
        <StaticText label="شیوه ارسال" value={order.sendingMethod} />
      </FieldContainer>
      <h2 className="text-xl text-stone-800 font-bold">اطلاعات گیرنده</h2>
      <FieldContainer>
        <StaticText
          label="نام"
          value={order.address.receiverSpecifications.firstName}
        />
        <StaticText
          label="نام خانوادگی"
          value={order.address.receiverSpecifications.lastName}
        />
        <StaticText
          label="شماره همراه"
          value={order.address.receiverSpecifications.phoneNumber}
        />
        <StaticText label="کد پستی" value={order.address.postalCode} />
      </FieldContainer>
      <FieldContainer>
        <StaticText label="استان" value={order.address.province} />
        <StaticText label="شهرستان" value={order.address.city} />
        <StaticText label="پلاک" value={order.address.plaque} />
        <StaticText
          label="واحد"
          value={order.address.unit ? order.address.unit : "وارد نشده"}
        />
      </FieldContainer>
      <StaticText label="آدرس کامل" value={order.address.postalAddress} />
      <h2 className="text-xl text-stone-800 font-bold">محصولات</h2>
      <ProductsList products={order.products} orderId={order._id} />
    </form>
  );
};

export default EditOrder;
