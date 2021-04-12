import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css";
import "../styles/index.scss";
import { ThemeProvider } from "context/theme-context";
import { Provider } from "next-auth/client";
import { ToastProvider } from "react-toast-notifications";
import { SWRConfig } from "swr";

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

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider session={pageProps.session}>
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
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
