import React from "react";
import { ProductData } from "../../models/product";
import Link from "next/link";
import { AuthState } from "../../models/user";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";
import styles from "../../styles/Product.module.scss";

const ProductComponents = ({
  product,
}: {
  product: ProductData;
}): JSX.Element => {
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { deleteProduct } = useActions();
  return (
    <div className={styles.productBox}>
      <img src={product.image} alt="" />

      <div className={styles.bottom}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <strong>In Price{product.price}</strong>
        <strong>In Stock: {product.stock} </strong>
        <Link href={`/product/${product.id}`}>view Product</Link>
      </div>


      {user?.email === "admin@gmail.com" && (
        <button
          onClick={() => {
            deleteProduct("", product.id);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductComponents;
