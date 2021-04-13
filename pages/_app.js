import { ThemeProvider } from "context/theme-context";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { ToastProvider } from "react-toast-notifications";
import { SWRConfig } from "swr";
import Nprogress from "nprogress";
import Router from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css";
import "../styles/index.scss";
import "nprogress/nprogress.css";
import theme from "theme";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

Router.onRouteChangeStart = (url) => {
  Nprogress.start();
};

Router.onRouteChangeComplete = (url) => {
  Nprogress.done();
};

Router.onRouteChangeError = (url) => {
  Nprogress.done();
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider session={pageProps.session}>
        <ChakraProvider theme={theme} resetCSS>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <SWRConfig
              value={{
                refreshInterval: 60000,
                fetcher,
                onError: (error, key) => {
                  if (error.status !== 403 && error.status !== 404) {
                    // addToast(error.message, { appearance: "error" });
                  }
                },
              }}
            >
              <ToastProvider
                autoDismissTimeout={2000}
                placement="top-center"
                autoDismiss
              >
                <Component {...pageProps} />
              </ToastProvider>
            </SWRConfig>
          </ColorModeProvider>
        </ChakraProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
