
import { useSWRInfinite } from "swr";
import { getAllArticles } from "lib/api";
import { SimpleGrid, Box, Button } from "@chakra-ui/react";

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
      {/* <Row>
        <Col md="4">
          <Search />
        </Col>
      </Row> */}

      <SimpleGrid className="mb-5" columns={1}>
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

      <Box display="flex" justifyContent="center" alignItems="center" className="mb-10">
        {data[data.length - 1].length !== 0 && (
          <Button
            isLoading={isValidating}
            loadingText="Түр хүлээнэ үү..."
            colorScheme="blue"
            onClick={() => setSize(size + 1)}
          >
            Цааш нь
          </Button>
        )}
      </Box>
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
