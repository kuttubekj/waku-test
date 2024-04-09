import type { AppProps } from "next/app";
import "../styles/globals.css";
import { WakuContextProvider } from "../context/waku/WakuContext";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <WakuContextProvider>
      <Component {...pageProps} />
    </WakuContextProvider>
  );
}

export default NextWeb3App;
