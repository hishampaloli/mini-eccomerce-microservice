import React from "react";
import { ProductData } from "../../models/product";
import Link from "next/link";
import { AuthState } from "../../models/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import styles from "../../styles/Product.module.scss";
import { toast } from "react-toastify";

const ProductComponents = ({
  product,
  inCart = false,
  count,
}: {
  product: ProductData;
  inCart?: boolean;
  count?: number;
}): JSX.Element => {
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { deleteProduct, addToCart, deleteFromCart } = useActions();

  const HandleaddToCart = async () => {
    if (product.id) {
      const data = await addToCart("", product.id);

      if (`${data}` === "Product Added To Cart") {
        toast.success(`${data}`);
      } else {
        toast.error(`${data}`);
      }
    }
  };

  const handleDeleteFromCart = async () => {
    if (product.id) {
      const data = await deleteFromCart("", product.id);

      if (`${data}` === "Product Deleted From Cart") {
        toast.success(`${data}`);
      } else {
        toast.error(`${data}`);
      }
    }
  };
  return (
    <div className={styles.productBox}>
      <img src={product.image} alt="" />

      <div className={styles.bottom} style={inCart ? { height: "350px" } : {}}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <strong>In Price{product.price}</strong>
        <strong>In Stock: {product.stock} </strong>
        <Link href={`/product/${product.id}`}>view Product</Link>
        {user?.email === "admin@gmail.com" ? (
          <button
            onClick={() => {
              deleteProduct("", product.id);
            }}
          >
            Delete
          </button>
        ) : (
          <>
            {inCart ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <strong
                  style={{
                    backgroundColor: "white",
                    padding: "15px 10px",
                    borderRadius: "5px",
                    width: "17%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {count}
                </strong>{" "}
                <button className={styles.addBtn} onClick={HandleaddToCart}>
                  Add More{" "}
                </button>
              </div>
            ) : (
              <button onClick={HandleaddToCart}>Add To Cart </button>
            )}
          </>
        )}
        {inCart && (
          <button onClick={handleDeleteFromCart}>Delete From Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductComponents;
