import React from "react";
import { SWRConfig } from "swr";
import { useToasts } from "react-toast-notifications";

const fetcher = async (url) => {
  const res = await fetch(url);
  const { addToast } = useToasts();
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    addToast(error.info, { appearance: "error" });
    throw error;
  }

  return res.json();
};

export default function MainApp({ children }) {
  const { addToast } = useToasts();
  return (
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
      {children}
    </SWRConfig>
  );
}
