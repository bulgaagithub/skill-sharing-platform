import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

import { useSession } from "next-auth/client";
import { useTheme } from "hooks/use-theme";
import useSWR from "swr";
import DataTable from "./data-table";
import { useToasts } from "react-toast-notifications";

import { API_URL } from "utils/axios";

const PAGE_LIMIT = 10;
export default function Current() {
  const [session] = useSession();
  const [pageIndex, setPageIndex] = useState(1);
  const { addToast } = useToasts();

  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      error.status = res.status;
      addToast(error.info, { appearance: "error" });
      throw error;
    }

    return res.json();
  };

  const { data, isValidating } = useSWR(
    `${API_URL}/api/v1/articles/user?page=${pageIndex}&limit=${PAGE_LIMIT}`,
    fetcher
  );

  let pages = [];
  let active = 1;

  if (data && data.data?.length !== 0) {
    for (let i = 0; i <= data.pagination.pageCount; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === active}
          onClick={() => setPageIndex(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  return isValidating ? (
    <div>Loading</div>
  ) : !data?.data?.length === 0 ? (
    <div>No data</div>
  ) : (
    <DataTable data={data?.articles} />
  );
}
