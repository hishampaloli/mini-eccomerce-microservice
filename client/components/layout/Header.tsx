import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions-creater/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthState } from "../../models/user";
import { useActions } from "../../hooks/useAction";
import style from "../../styles/Header.module.scss";

const Header = (): JSX.Element => {
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { Logout } = useActions();

  return (
    <div className={style.header}>
      <div>
        <Link href="/">
          <h1>SHOPIT</h1>
        </Link>
      </div>
      <div className={style.right}>
        {user?.email ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {user?.email === "admin@gmail.com" ? (
              <Link href={"/admin/products"}>Product</Link>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Link href={"/user/profile"}>Profile</Link>
                <Link href={"/user/cart"}>Cart</Link>
              </div>
            )}

            <p>{user?.email}</p>
            <button
              onClick={() => {
                Logout("");
              }}
              style={{
                padding: "10px 15px",
                border: "none",
                backgroundColor: "white",
                borderRadius: "5px",
                marginLeft: "15px",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Link href={"/user/signup"}>signUp</Link>
            <Link href={"/user/signin"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
