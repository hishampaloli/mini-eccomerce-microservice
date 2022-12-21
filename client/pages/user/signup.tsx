import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp, clearErrors } from "../../redux/actions-creater/userActions";
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
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSignUp} style={{ display: "flex" }}>
          <input
            type="text"
            name=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="name"
            id=""
          />
          <input
            type="email"
            name=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="email"
            id=""
          />
          <input
            type="text"
            name=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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
