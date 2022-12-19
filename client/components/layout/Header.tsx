import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/userActions";

const Header = () => {
  const { user } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

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
                dispatch<any>(Logout(''));
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
    </div>
  );
};

export default Header;
