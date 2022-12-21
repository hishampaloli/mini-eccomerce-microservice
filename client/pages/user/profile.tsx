import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const profile = () => {
  const { user } = useTypedSelector((state) => state.user);
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const { UpdateUser } = useActions();

  const handleUpdate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      const data = await UpdateUser("", { address, image }, user?.id);
      console.log(data);

      if (`${data}` === "User Updated") {
        toast.success(`${data}`);
      } else {
        toast.error(`${data}`);
      }
    }
  };

  return (
    <Layout title={`Welcome ${user?.name && user.name}`}>
      <div>
        <div>
          <h1>{user?.email}</h1>
          <h1>{user?.name}</h1>
          <h1>{user?.address}</h1>

          <button onClick={() => setEdit(!edit)}>edit</button>
        </div>
        <div>
          {edit && (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder={user?.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />

              <input
                type="text"
                placeholder={user?.image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default profile;
