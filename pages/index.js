import { useSWRInfinite } from "swr";
import { getAllArticles } from "lib/api";
import { SimpleGrid, Box, Button, SkeletonText } from "@chakra-ui/react";

import Layout from "components/layout";
import Intro from "components/intro";
// import Search from "components/search";
import GridItem from "components/grid-item";

const PAGE_LIMIT = 3;
export default function Home({ articles }) {
  const { data, isValidating, size, setSize } = useSWRInfinite(
    (index) =>
      `/api/articles?status=status=approved&page=${index}&limit=${PAGE_LIMIT}`,
    {
      initialData: [articles],
    }
  );

  return (
    <Layout>
      <SimpleGrid columns={1}>
        <Box className="mb-2">
          <Intro />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={1}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data &&
          data.map(
            (page) =>
              page &&
              page.map((article, i) => (
                <Box md={12} key={article.title}>
                  <GridItem article={article} />
                </Box>
              ))
          )}
      </SimpleGrid>

      {data[data.length - 1].length !== 0 &&
        (isValidating ? (
          <Box padding="6" boxShadow="lg" bg="white">
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="50px"
            mb={5}
          >
            <Button
              isLoading={isValidating}
              loadingText="Түр хүлээнэ үү..."
              colorScheme="blue"
              onClick={() => setSize(size + 1)}
            >
              Цааш нь
            </Button>
          </Box>
        ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const articles = await getAllArticles(0, PAGE_LIMIT, "status=approved");
  return {
    props: {
      articles: articles ? articles : [],
    },
    revalidate: 10,
  };
};
