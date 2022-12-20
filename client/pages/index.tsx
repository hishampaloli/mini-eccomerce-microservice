import { Inter } from "@next/font/google";
import Layout from "../components/layout/Layout";
import { wrapper } from "../redux";
import { useEffect } from "react";
import Router from "next/router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AuthState } from "../models/user";
import { ProductState } from "../models/product";
import ProductComponents from "../components/products/ProductComponents";
import { getProducts } from "../redux/actions-created";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { user, error }: AuthState = useTypedSelector((state) => state.user);
  const { products }: ProductState = useTypedSelector(
    (state) => state.allProducts
  );

  useEffect(() => {
    if (user?.email === "admin@gmail.com") {
      Router.push("/admin");
    }
  }, []);
  return (
    <>
      <Layout title={"Shopit"}>
        <div>
          {products.map((el: any) => {
            return <ProductComponents product={el} key={el.id} />;
          })}
        </div>
      </Layout>
    </>
  );
}


Home.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    await store.dispatch(getProducts(context));
    return {};
  }
);
