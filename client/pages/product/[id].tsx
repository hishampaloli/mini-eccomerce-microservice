import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import ProductComponents from "../../components/products/ProductComponents";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductData, ViewProductState } from "../../models/product";
import { wrapper } from "../../redux";
import { clearErrors, getSingleProduct } from "../../redux/actions-created";

const ProductView = (): JSX.Element => {
  const router = useRouter();

  const { getSingleProduct } = useActions();
  const { product, error, loading }: ViewProductState = useTypedSelector(
    (state) => state.viewProduct
  );

  console.log(error);

  useEffect(() => {
    if (error) {
      toast.success(error[0]?.message);
      console.log("1234");
    }
  }, [error]);

  return (
    <Layout title={product?.title ? product.title : "Something went wrong"}>
      <div>
        {product && <ProductComponents product={product} />}
        {error && "error is there"}
      </div>
    </Layout>
  );
};

export default ProductView;

ProductView.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context: any) => {
    await store.dispatch(getSingleProduct(context, context.query.id));
    return {};
  }
);
