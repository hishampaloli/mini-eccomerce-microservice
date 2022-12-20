import React from "react";
import { ProductData } from "../../models/product";
import Link from "next/link";
import { AuthState } from "../../models/user";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";

const ProductComponents = ({
  product,
}: {
  product: ProductData;
}): JSX.Element => {
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { deleteProduct } = useActions();
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>In Price{product.price}</strong>
      <strong>In Stock: {product.stock} </strong>
      <Link href={`/product/${product.id}`}>view Product</Link>
      {user?.email === "admin@gmail.com" && (
        <button onClick={() => {
            deleteProduct('', product.id)
        }}>Delete</button>
      )}
    </div>
  );
};

export default ProductComponents;
