import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css";
import "../styles/index.scss";
import { ThemeProvider } from "context/theme-context";
import { Provider } from "next-auth/client";
import { ToastProvider } from "react-toast-notifications";
import MainApp from "components/main-app";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider session={pageProps.session}>
        <ToastProvider autoDismissTimeout={1000} placement="top-center">
          <MainApp>
            <Component {...pageProps} />
          </MainApp>
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
