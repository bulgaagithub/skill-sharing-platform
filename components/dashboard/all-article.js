import { useState } from "react";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import DataTable from "./data-table";
import Review from "./review";

const PAGE_LIMIT = 10;
export default function All({ categories }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [reviewArticle, setReview] = useState(null);

  const { data, isValidating } = useSWR(
    `/api/articles?page=${pageIndex}&limit=${PAGE_LIMIT}`
  );

  const handleReview = (article) => {
    setReview(article);
  };

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
