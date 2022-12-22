import React, { useState } from "react";
import { useActions } from "../../hooks/useAction";
import { actionCreators } from "../../redux";
import { toast } from "react-toastify";
import styles from "../../styles/Product.module.scss";

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
    <div className={styles.addProductBox}>
      <form onSubmit={handleSubmit}>
        <h1>Add Products</h1>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder="title"
            name=""
            id=""
          />
        </div>

        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="description"
            name=""
            id=""
          />
        </div>

        <div>
          <label htmlFor="">Price</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(e.target.value))
            }
            type="number"
            placeholder="price"
            id=""
          />
        </div>

        <div>
          <label htmlFor="">Stock</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStock(Number(e.target.value))
            }
            type="number"
            placeholder="stock"
            id=""
          />
        </div>

        <div>
          <label htmlFor="">Image URL</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.value)
            }
            type="text"
            placeholder="image-url"
            id=""
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
