import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../redux/actions-created/productsActions";
import { wrapper } from "../../redux/store";
import buildClient from "../../api/buildClient";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductState } from "../../models/product";
import { useActions } from "../../hooks/useAction";

const AllProducts = (): JSX.Element => {
  const { products, error }: ProductState = useTypedSelector(
    (state) => state.allProducts
  );

  const { getProducts } = useActions();

  useEffect(() => {
    getProducts("sdf");
  }, []);
  return (
    <div>
      <h1>All Products</h1>
      <b>786</b>
      <h1>{error && error[0]?.message}</h1>
      <div>
        {products?.map((el: any) => {
          return <h1>{el.title}</h1>;
        })}
      </div>
    </div>
  );
};

export default AllProducts;

AllProducts.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    await store.dispatch(getProducts(context));
    return {};
  }
);
