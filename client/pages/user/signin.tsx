import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Login,clearErrors } from "../../redux/actions/userActions";
import getSession from 'next-auth'
import { toast } from "react-toastify";

const signin = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const { user, error } = useSelector((state: any) => state.user);

  console.log(user);
  console.log(error);

  const handleSignIn = (e: any) => {
    e.preventDefault();
    dispatch<any>(Login("", email, password));
  };

  useEffect(() => {
    console.log(3434343433443);
    
    if (user?.email) {
      Router.push("/");
    }
    if (error) {
      toast.success(error[0].message);
      dispatch<any>(clearErrors())
      console.log("1234");
    }
  }, [error]);



  return (
    <Layout title={"Register"}>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSignIn} style={{ display: "flex" }}>
          <input
            type="text"
            name=""
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            id=""
          />
          <input
            type="email"
            name=""
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            id=""
          />
          <input
            type="text"
            name=""
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            id=""
          />
          <button type="submit">SignIn</button>
        </form>
      </div>
    </Layout>
  );
};



export default signin;
