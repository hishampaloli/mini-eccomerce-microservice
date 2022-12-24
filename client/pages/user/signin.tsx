import Router from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthState } from "../../models/user";
import { useActions } from "../../hooks/useAction";
import styles from "../../styles/SignUp.module.scss";

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
    }
  }, [error]);

  return (
    <Layout title={"Register"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.loginBox}>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default signin;
