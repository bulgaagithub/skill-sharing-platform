import { useState } from "react";
import useSWR from "swr";
import { Box, SkeletonText } from "@chakra-ui/react";
import DataTable from "components/dashboard/data-table";
import Review from "components/dashboard/review";

const PAGE_LIMIT = 10;
export default function All({ categories, reviewArticle, handleReview }) {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isValidating } = useSWR(
    `/api/articles?page=${pageIndex}&limit=${PAGE_LIMIT}`
  );

  return isValidating ? (
    <Box padding="6" boxShadow="lg" bg="white" mt={2}>
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  ) : !data?.length === 0 ? (
    <div>Одоогоор нийтлэл ороогүй байна.</div>
  ) : reviewArticle ? (
    <Review
      article={reviewArticle}
      categories={categories}
      handleReview={handleReview}
    />
  ) : (
    <DataTable data={data ? data : []} handleReview={handleReview} />
  );
}
