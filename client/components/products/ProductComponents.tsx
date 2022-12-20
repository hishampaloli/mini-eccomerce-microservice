import React from "react";
import { ProductData } from "../../models/product";

const ProductComponents = ({
  product,
}: {
  product: ProductData;
}): JSX.Element => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>In Price{product.price}</strong>
      <strong>In Stock: {product.stock} </strong>
    </div>
  );
};

export default ProductComponents;
