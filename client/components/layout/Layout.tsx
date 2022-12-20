import React from "react";
import Head from "next/head";
import Header from "./Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Layout = ({
  children,
  title = "Book Best Hotels for your Holiday",
}: {
  children: any;
  title: string;
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />{" "}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      <ToastContainer position="bottom-right" />
      {children}
    </div>
  );
};

export default Layout;
