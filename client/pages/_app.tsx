import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import buildClient from "../api/buildClient";
import { currentUser } from "../redux/actions/userActions";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext: any) => {
    const client = buildClient(appContext.ctx);
    console.log("***********************");
    const { data } = await client.get("/api/auth/currentuser");
    console.log(data);
    
    store.dispatch(currentUser(data))
    console.log("***********************");

    let pageProps = {};

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
      ...data,
    };
  }
);


export default wrapper.withRedux(MyApp);
