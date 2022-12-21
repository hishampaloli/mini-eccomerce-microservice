import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import buildClient from "../api/buildClient";
import { currentUser } from "../redux/actions-creater/userActions";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext: any) => {
    const client = buildClient(appContext.ctx);

    try {
      const { data } = await client.get("/api/auth/currentuser");
      const response = await client.get(`/api/user/${data.id.id}`);
      store.dispatch(currentUser(appContext.ctx, response.data));
    } catch (error) {
      console.log(error);
    }

    let pageProps = {};

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
    };
  }
);

export default wrapper.withRedux(MyApp);
