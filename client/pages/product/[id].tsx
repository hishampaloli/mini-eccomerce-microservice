import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import ProductComponents from "../../components/products/ProductComponents";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ViewProductState } from "../../models/product";
import { AuthState } from "../../models/user";
import { wrapper } from "../../redux";
import { getSingleProduct } from "../../redux/actions-creater";
import styles from "../../styles/Product.module.scss";

const ProductView = (): JSX.Element => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [image, setImage] = useState<string>();

  const { UpdateProduct } = useActions();
  const { user }: AuthState = useTypedSelector((state) => state.user);
  const { product, error, loading }: ViewProductState = useTypedSelector(
    (state) => state.viewProduct
  );

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (product?.id) {
      const data = await UpdateProduct(
        "",
        { description, image, price, stock, title },
        product?.id
      );

      if (`${data}` === "Product updated") {
        toast.success(`${data}`);
      } else {
        toast.error(`${data}`);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast.success(error[0]?.message);
    }
  }, [error]);

  return (
    <Layout title={product?.title ? product.title : "Something went wrong"}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{product && <ProductComponents product={product} />}</div>

        <div style={{ width: "70%", marginRight: "3%" }}>
          <div className={styles.addProductBox}>
            {user?.email === "admin@gmail.com" && (
              <form onSubmit={handleUpdate}>
                <h1>Edit Products</h1>
                <div>
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                    placeholder={product?.title}
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
                    placeholder={product?.description}
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
                    placeholder={product?.price?.toString()}
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
                    placeholder={product?.stock?.toString()}
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
                    placeholder={product?.image}
                    id=""
                  />
                </div>
                <button type="submit">Edit Product</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductView;

ProductView.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context: any) => {
    await store.dispatch(getSingleProduct(context, context.query.id));
    return {};
  }
);
