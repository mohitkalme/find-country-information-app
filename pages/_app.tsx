import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { store } from "../store/";
import { Provider } from "react-redux";

import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
