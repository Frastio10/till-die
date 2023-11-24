import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <Component {...pageProps} />
      </StyleSheetManager>
    </>
  );
}
