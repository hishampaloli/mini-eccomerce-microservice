import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const profile = () => {
  const { user } = useTypedSelector((state) => state.user);
  return <div>
    <h1>{user?.email}</h1>
    <h1>{user?.name}</h1>
    <h1>{user?.isBlocked}</h1>
  </div>;
};

export default profile;
