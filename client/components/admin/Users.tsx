import React from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../hooks/useAction";
import { UserAuthData } from "../../models/user";
import { blockUser } from "../../redux/actions-creater/adminAction";

const Users = ({ user }: { user: UserAuthData }): JSX.Element => {
  const { blockUser } = useActions();
  return (
    <div style={{ display: "flex", border: "1px" }}>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h3>isBlocked{user.isBlocked ? "true" : "false"}</h3>
      <button
        onClick={() => {
          blockUser("", user.id);
        }}
      >
        IsBlocked
      </button>
    </div>
  );
};

export default Users;
