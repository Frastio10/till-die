import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.alert = console.log;
  }, []);
  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <Component {...pageProps} />
      </StyleSheetManager>
    </>
  );
}
