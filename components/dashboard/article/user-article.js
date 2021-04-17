import { useState } from "react";
import { Box, SkeletonText } from "@chakra-ui/react";
import { useToasts } from "react-toast-notifications";
import { useSession, signOut } from "next-auth/client";
import useSWR from "swr";

import DataTable from "components/dashboard/data-table";
import Review from "components/dashboard/review";
import Page from "components/dashboard/pagination";

const PAGE_LIMIT = 10;
export default function Current({ categories, reviewArticle, handleReview }) {
  const [session] = useSession();
  const [pageIndex, setPageIndex] = useState(0);
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/articles?page=${pageIndex}&limit=${PAGE_LIMIT}`,
    fetcher
  );

  return isValidating ? (
    <Box padding="6" boxShadow="lg" bg="white" mt={2}>
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  ) : !data?.data?.length === 0 ? (
    <div>Одоогоор нийтлэл ороогүй байна.</div>
  ) : reviewArticle ? (
    <Review
      article={reviewArticle}
      categories={categories}
      handleReview={handleReview}
    />
  ) : (
    <>
      <DataTable data={data ? data.articles : []} handleReview={handleReview} />
      <Page pageData={data ? data?.pagination : []} setPage={setPageIndex} pageIndex={pageIndex} />
    </>
  );
}
