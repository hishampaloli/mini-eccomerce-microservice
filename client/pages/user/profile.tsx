import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "../../styles/Profile.module.scss";

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
      <div className={styles.profileBox}>
        <div className={styles.profileDiv}>
          <h2 style={{ textAlign: "center" }}>My Profile</h2>
          <p>
            {" "}
            <strong>Email: </strong> {user?.email}
          </p>
          <p>
            <strong>Name: </strong> {user?.name}
          </p>
          <p>
            <strong>Adress: </strong> {user?.address}
          </p>

          <button style={{ marginTop: "30px" }} onClick={() => setEdit(!edit)}>
            Edit
          </button>
        </div>
        {edit && (
          <form onSubmit={handleUpdate}>
            <h2 style={{ textAlign: "center" }}>Change Details</h2>
            <div>
              <label htmlFor="">Address</label>
              <input
                type="text"
                placeholder={user?.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
            </div>

            <div>
              <label htmlFor="">Image URL</label>
              <input
                type="text"
                placeholder={user?.image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              />
            </div>
            <button style={{ marginTop: "20px" }} type="submit">
              Update
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default profile;
