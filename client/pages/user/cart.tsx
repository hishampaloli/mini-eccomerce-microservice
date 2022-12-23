import React from "react";
import Layout from "../../components/layout/Layout";
import ProductComponents from "../../components/products/ProductComponents";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CartData } from "../../models/cart";
import { wrapper } from "../../redux";
import { getCartItems } from "../../redux/actions-creater";

const Cart = () => {
  const { cart } = useTypedSelector((state) => state.cart);

  return (
    <Layout title="Cart">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {cart.length > 0
          ? cart.map((el: CartData) => {
              return (
                <div>
                  <ProductComponents
                    product={el.product}
                    count={el.count}
                    inCart={true}
                  />
                </div>
              );
            })
          : "Nothing in cart"}
      </div>
    </Layout>
  );
};

export default Cart;

Cart.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    await store.dispatch(getCartItems(context));
    return {};
  }
);
