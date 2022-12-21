import React, { useState } from "react";
import { useActions } from "../../hooks/useAction";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";

const AddProduct = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [image, setImage] = useState<string>();
  const { addNewProduct } = useActions();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(232323);

    if (title && image && price && stock && description) {
      const data = await addNewProduct("", {
        title,
        description,
        image,
        price,
        stock,
      });

      if (`${data}` === "product added") {
        toast.success(`${data}`);
      } else {
        toast.error(`${data}`);
      }
    }
  };
  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="title"
          name=""
          id=""
        />
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          placeholder="description"
          name=""
          id=""
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPrice(Number(e.target.value))
          }
          type="number"
          placeholder="price"
          id=""
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStock(Number(e.target.value))
          }
          type="number"
          placeholder="stock"
          id=""
        />
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.value)
          }
          type="text"
          placeholder="image-url"
          id=""
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
