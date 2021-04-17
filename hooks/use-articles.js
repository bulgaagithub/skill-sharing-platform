import useSWR from "swr";

const fetcher = async (url, session, addToast) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    const result = await res.json();
    if (result.error.name === "TokenExpiredError") {
      addToast("Нэвтрэх эрх дууссан байна.", { appearance: "error" });
      setTimeout(() => {
        signOut();
      }, 1000);
    } else {
      addToast(result.error.message + result.error.statusCode, {
        appearance: "error",
        autoDismiss: 6000,
      });
    }
    return false;
  }
  return res.json();
};

export const useArticles = (url, session, addToast) => {
  const { data, isValidating, error } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}${url}}`, session, addToast],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Never retry for a specific key.
        if (key === "/api/user") return;

        // Only retry up to 10 times.
        if (retryCount >= 3) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
      },
      refreshInterval: 1000,
    }
  );

  return {
    data,
    isValidating,
    error,
  };
};
