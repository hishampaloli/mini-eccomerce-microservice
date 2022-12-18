import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import buildClient from "../api/buildClient";
import { currentUser } from "../redux/actions/userActions";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (context) => {
    console.log("APAPAPAPAPAPAPAPAPA");
    
   await store.dispatch(currentUser(context));
    return {};
  }
);

export default wrapper.withRedux(MyApp);
