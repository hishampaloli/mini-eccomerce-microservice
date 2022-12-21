import React, { useState } from "react";
import { useActions } from "../../hooks/useAction";
import { actionCreators } from "../../redux";

const AddProduct = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [image, setImage] = useState<string>();
  const { addNewProduct } = useActions();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (title && image && price && stock && description)
      addNewProduct("", { title, description, image, price, stock });
  };
  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="title" name="" id="" />
        <input type="text" placeholder="description" name="" id="" />
        <input type="number" placeholder="price" id="" />
        <input type="number" placeholder="stock" id="" />
        <input type="text" placeholder="image-url" id="" />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
