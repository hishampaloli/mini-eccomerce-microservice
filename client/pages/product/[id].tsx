import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import ProductComponents from "../../components/products/ProductComponents";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ProductData, ViewProductState } from "../../models/product";
import { AuthState } from "../../models/user";
import { wrapper } from "../../redux";
import { clearErrors, getSingleProduct } from "../../redux/actions-creater";

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
      console.log("1234");
    }
  }, [error]);

  return (
    <Layout title={product?.title ? product.title : "Something went wrong"}>
      <div>
        {product && <ProductComponents product={product} />}
      </div>
      {user?.email === "admin@gmail.com" && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder={product?.title}
            name=""
            id=""
          />
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder={product?.description}
            name=""
            id=""
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(e.target.value))
            }
            type="number"
            placeholder={product?.price.toString()}
            id=""
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStock(Number(e.target.value))
            }
            type="number"
            placeholder={product?.stock.toString()}
            id=""
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setImage(e.target.value)
            }
            type="text"
            placeholder={product?.image}
            id=""
          />
          <button type="submit">Update</button>
        </form>
      )}
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
