import React from "react";
import { useDispatch } from "react-redux";
import { blockUser } from "../../redux/actions/adminAction";

const Users = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex", border: "1px" }}>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <h3>isBlocked{user.isBlocked ? "true" : "false"}</h3>
      <button
        onClick={() => {
          dispatch<any>(blockUser("", user.id));
        }}
      >
        IsBlocked
      </button>
    </div>
  );
};

export default Users;
