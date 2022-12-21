import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Login, clearErrors } from "../../redux/actions-creater/userActions";
import getSession from "next-auth";
import { toast } from "react-toastify";
import { RootState } from "../../redux/reducers/reducers";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthState } from "../../models/user";
import { SingInAction } from "../../redux/action-models";
import { useActions } from "../../hooks/useAction";

const signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { Login, clearErrors } = useActions();

  const { user, error }: AuthState = useTypedSelector((state) => state.user);

  const handleSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Login("", { email, password });
  };

  useEffect(() => {
    if (user?.email) {
      Router.push("/");
    }

    if (error) {
      toast.success(error[0].message);
      clearErrors();
      console.log("1234");
    }
  }, [error]);

  return (
    <Layout title={"Register"}>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSignIn} style={{ display: "flex" }}>
          <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="email"
            id=""
          />
          </div>

          <div>
            <label htmlFor="">Password</label>
          <input
            type="text"
            name=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="password"
            id=""
          />
          </div>
          <button type="submit">SignIn</button>
        </form>
      </div>
    </Layout>
  );
};

export default signin;
