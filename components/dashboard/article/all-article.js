import { useState } from "react";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import DataTable from "components/dashboard/data-table";
import Review from "components/dashboard/review";

const PAGE_LIMIT = 10;
export default function All({ categories, reviewArticle, handleReview }) {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isValidating } = useSWR(
    `/api/articles?page=${pageIndex}&limit=${PAGE_LIMIT}`
  );

  return isValidating ? (
    <div>Loading</div>
  ) : !data?.length === 0 ? (
    <div>No data</div>
  ) : reviewArticle ? (
    <Review article={reviewArticle} categories = {categories} handleReview={handleReview}/>
  ) : (
    <DataTable data={data ? data : []} handleReview={handleReview} />
  );
}
