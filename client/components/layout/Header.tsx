import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions-created/userActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthState } from "../../models/user";
import { useActions } from "../../hooks/useAction";

const Header = (): JSX.Element => {
  const { user }: AuthState = useTypedSelector((state) => state.user);

  const { Logout } = useActions();

  return (
    <div>
      <div>
        <h1>SHOPIT</h1>
      </div>
      <div>
        {user?.email ? (
          <div>
            <button
              onClick={() => {
                Logout("");
              }}
            >
              <h2>Logout</h2>
            </button>
            <h2>Welocome: {user?.email}</h2>
          </div>
        ) : (
          <div>
            <Link href={"/user/signup"}>signUp</Link>
            <Link href={"/user/signin"}>Login</Link>
          </div>
        )}
      </div>

      <div>
        {user?.email === "admin@gmail.com" ? (
          <div>
            <Link href={"/admin/products"}>Manage Product</Link>
          </div>
        ) : (
          <div>
            <Link href={"/user/profile"}>Profile</Link>
            <Link href={"/user/cart"}>Cart</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
