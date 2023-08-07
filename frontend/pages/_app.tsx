import "@/styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import Store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadSeller, loadUser } from "../redux/actions/user";
import { getAllProducts } from "../redux/actions/product";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "../flow/config";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);

  const theme = extendTheme({ config });

  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Provider store={Store}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </SessionProvider>
      </Provider>
    </ChakraProvider>
  );
}
