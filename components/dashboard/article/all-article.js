import { useState } from "react";
import { Box, SkeletonText } from "@chakra-ui/react";
import DataTable from "components/dashboard/data-table";
import Review from "components/dashboard/review";
import Page from "components/dashboard/pagination";
import { useFetch } from "hooks/use-fetch";
import { useToasts } from "react-toast-notifications";
import { useSession, signOut } from "next-auth/client";

const PAGE_LIMIT = 2;
export default function All({ categories, reviewArticle, handleReview }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [session] = useSession();
  const { addToast } = useToasts();

//   const { data, isValidating } = useSWR(
//     `/api/articles?page=${pageIndex}&limit=${PAGE_LIMIT}`
//   );

  const { data, isValidating, error } = useFetch(`/api/v1/articles?page=${pageIndex + 1}&limit=${PAGE_LIMIT}`, session, addToast, signOut);

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
    <>
    <DataTable data={data ? data.articles : []} handleReview={handleReview} />
    <Page pageData={data ? data?.pagination : []} setPage={setPageIndex} pageIndex={pageIndex} />
    {/* <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div> */}
    </>
  );
}
