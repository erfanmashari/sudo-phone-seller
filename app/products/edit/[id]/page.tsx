import ProductsEditComponent from "@/context/Products/Edit";

const getData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}products/single/unique/${id}/`,
    { cache: "no-cache" }
  );
  const json = await res.json();

  return json.status === 200 ? json.data.product : false;
};

async function ProductsEdit(props: any) {
  const product: any = await getData(props.params.id);

  return (
    <>
      {product ? (
        <ProductsEditComponent product={product} />
      ) : (
        "این محصول وجود ندارد!"
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps<{
//   product: Product;
// }> = async (context: GetServerSidePropsContext) => {
//   // get product id from the url
//   const productId = parseInt(context.params?.id as string) || 1;

//   // Define the API url with the product id
//   const API_URL = `https://api.slingacademy.com/v1/sample-data/products/${productId}`;

//   // Fetch data
//   const res = await fetch(API_URL);

//   // Parse the data
//   const data = await res.json();
//   const product = data.product;

//   // If the product is not found, return notFound - 404 page
//   if (product === null) {
//     return {
//       notFound: true,
//     };
//   }

//   // Return the product as props
//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductsEdit;
