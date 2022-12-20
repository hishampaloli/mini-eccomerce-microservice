import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import ProductComponents from "../../components/products/ProductComponents";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductData, ProductState } from "../../models/product";
import { AuthState, UserAuthData } from "../../models/user";
import { getProducts } from "../../redux/actions-created/productsActions";

const products: React.FC = (): JSX.Element => {
  const { products, loading }: ProductState = useTypedSelector(
    (state) => state.allProducts
  );
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { getProducts } = useActions();

  useEffect(() => {
    if (user?.email !== "admin@gmail.com") {
      Router.push("/");
    }
    getProducts("sdf");
  }, []);

  return (
    <Layout title="Manage Product">
      <div>
        <div>
          {products.map((el: ProductData) => {
            return <ProductComponents key={el.id} product={el} />;
          })}
        </div>

        <div>
            
        </div>
      </div>
    </Layout>
  );
};

export default products;
