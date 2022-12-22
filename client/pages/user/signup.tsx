import React, { useEffect, useState } from "react";
import styles from "../../styles/SignUp.module.scss";
import Router from "next/router";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { AuthState } from "../../models/user";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp, clearErrors } = useActions();

  const { user, error }: AuthState = useTypedSelector((state) => state.user);

  const handleSignUp = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    signUp("", { name, email, password });
  };

  useEffect(() => {
    if (user?.email) {
      Router.push("/");
    }
    if (error) {
      toast.success(error[0]?.message);
      clearErrors();
    }
  }, [error]);

  return (
    <Layout title={"Login"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.loginBox}>
          <h1>Register</h1>
          <form onSubmit={handleSignUp} style={{ display: "flex" }}>
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="name"
                id=""
              />
            </div>

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
      </div>
    </Layout>
  );
};

export default SignUp;
