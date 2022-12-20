import React from "react";

const ProductComponents = ({ product }: { product: any }) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>{product.price}</strong>
    </div>
  );
};

export default ProductComponents;
