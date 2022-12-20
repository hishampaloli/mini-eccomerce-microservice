import Router from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Users from "../../components/admin/Users";
import Layout from "../../components/layout/Layout";
import { getAllUsers } from "../../redux/actions/adminAction";

const index = () => {
  const dispatch = useDispatch();

  const { user, error } = useSelector((state: any) => state.user);
  const allusers = useSelector((state: any) => state)

  console.log(allusers);
  
  useEffect(() => {
    console.log(3434343433443);
    dispatch<any>(getAllUsers(""));

    if (user?.email !== "admin@gmail.com") {
      Router.push("/");
    }
  }, []);
  return (
    <div>
      <Layout title={"Admin"}>
        <h1>Admin</h1>
        <Users />
      </Layout>
    </div>
  );
};

export default index;
