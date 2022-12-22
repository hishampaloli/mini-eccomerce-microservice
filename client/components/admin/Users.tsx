import React from "react";
import { toast } from "react-toastify";
import { useActions } from "../../hooks/useAction";
import { UserAuthData } from "../../models/user";
import styles from "../../styles/Admin.module.scss";

const Users = ({ user }: { user: UserAuthData }): JSX.Element => {
  const { blockUser } = useActions();
  return (
    <div className={styles.userBox}>
      <div className={styles.left}>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.address}</p>
      </div>

      <div className={styles.right}>
        <button
          onClick={async () => {
            const data = await blockUser("", user.id);
            if (`${data}` === "Action Completed") {
              toast.success(`${data}`);
            } else {
              toast.error(`${data}`);
            }
          }}
          style={
            user.isBlocked
              ? { backgroundColor: "rgb(255, 67, 67)" }
              : { backgroundColor: "rgb(86, 255, 105)" }
          }
        >
          {user.isBlocked ? "Un Block" : "Block"}
        </button>
      </div>
    </div>
  );
};

export default Users;
