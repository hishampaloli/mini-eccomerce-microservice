import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";
import { wrapper } from "../../redux/store";
import buildClient from "../../api/buildClient";

const AllProducts = () => {
  const products = useSelector((state: any) => state.allProducts);

  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(786);
    dispatch<any>(getProducts("sdf"));
  }, []);
  return (
    <div>
      <h1>All Products</h1>
      <b>786</b>
      <h1>{products?.error?.errors && products?.error?.errors[0]?.message}</h1>
      <div>
        {products?.products?.map((el: any) => {
          return <h1>{el.title}</h1>;
        
        })}
      </div>
    </div>
  );
};

// AllProducts.getInitialProps = async ({ctx, reduxStore }: {ctx: any, reduxStore: any}) => {
//   console.log("**************8");

//   console.log(reduxStore);

// //   dispatch<any>(getProducts(ctx));

//   return {};
// };

// AllProducts.getInitialProps = async ({ctx, reduxStore}: {ctx: any, reduxStore: any}) => {
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>****");

//     reduxStore.dispatch(getProducts(ctx))
//     return {}
// }

AllProducts.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    console.log("+&&&&&&&&%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

   await store.dispatch(getProducts(context));
    return {};
  }
);
export default AllProducts;