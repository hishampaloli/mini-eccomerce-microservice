import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductComponents from "../../components/products/ProductComponents";
import { getProducts } from "../../redux/actions/productsActions";

const products = () => {
  const { products, loading } = useSelector((state: any) => state.allProducts);
  const { user, error } = useSelector((state: any) => state.user);

  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email !== "admin@gmail.com") {
      Router.push("/");
    }
    dispatch<any>(getProducts("sdf"));
  }, []);

  return (
    <div>
      {products.map((el: any) => {
        return <ProductComponents key={el.id} product={el} />;
      })}
    </div>
  );
};

export default products;
