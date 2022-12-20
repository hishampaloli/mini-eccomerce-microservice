import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp, clearErrors } from "../../redux/actions/userActions";
import Router from "next/router";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const { user, error } = useSelector((state: any) => state.user);

  console.log(user);
  console.log(error);

  const handleSignUp = (e: any) => {
    e.preventDefault();
    dispatch<any>(signUp("", { name, email, password }));
  };

  useEffect(() => {
    if (user?.email) {
      Router.push("/");
    }
    if (error) {
      toast.success(error[0]?.message);
      dispatch<any>(clearErrors());
      console.log("1234");
    }
  }, [error]);

  return (
    <Layout title={"Login"}>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSignUp} style={{ display: "flex" }}>
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

export default SignUp;
