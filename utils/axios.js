// NEXT_PUBLIC_API_URL = http://localhost:9000

const fetcher = async (url, method) => {
  const res = await fetch(`http://localhost:9000${url}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};


export default fetcher;

export const API_URL = 'http://localhost:9000';
