import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

import { useSession, signOut } from "next-auth/client";
import useSWR from "swr";
import DataTable from "components/dashboard/data-table";
import { useToasts } from "react-toast-notifications";
import Review from "components/dashboard/review";

const PAGE_LIMIT = 10;
export default function Current({ categories, reviewArticle, handleReview }) {
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
      const result = await res.json();
      if (result.error.name === "TokenExpiredError") {
        addToast("Нэвтрэх эрх дууссан байна.", { appearance: "error" });
        setTimeout(() => {
          signOut();
        }, 1000);
      }
      return false;
    }
    return res.json();
  };

  const { data, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/user?page=${pageIndex}&limit=${PAGE_LIMIT}`,
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
  ) : reviewArticle ? (
    <Review
      article={reviewArticle}
      categories={categories}
      handleReview={handleReview}
    />
  ) : (
    <DataTable data={data ? data?.articles : []} handleReview={handleReview} />
  );
}
