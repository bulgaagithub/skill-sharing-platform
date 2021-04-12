import { Row, Col, Button } from "react-bootstrap";
import Layout from "components/layout";
import Intro from "components/intro";
import Search from "components/search";

import { useSWRInfinite } from "swr";
import { getAllArticles } from "lib/api";
import GridItem from "components/grid-item";

const PAGE_LIMIT = 1;
export default function Home({ articles }) {
  const { data, isValidating, size, setSize } = useSWRInfinite(
    (index) => `/api/articles?status=status=approved&page=${index}&limit=${PAGE_LIMIT}`,
    {
      initialData: [articles],
    }
  );

  return (
    <Layout>
      <Row>
        <Col md="8">
          <Intro />
        </Col>
      </Row>
      {/* <Row>
        <Col md="4">
          <Search />
        </Col>
      </Row> */}
      <hr />

      <Row className="mb-5">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data &&
          data.map(
            (page) =>
              page &&
              page.map((article, i) => (
                <Col md={12} key={article.title}>
                  <GridItem article={article} />
                </Col>
              ))
          )}
      </Row>

      <div style={{ textAlign: "center" }}>
        {data[data.length - 1].length !== 0 &&
          (isValidating ? (
            <div>Түр хүлээнэ үү...</div>
          ) : (
            <Button onClick={() => setSize(size + 1)}>Цааш нь</Button>
          ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const articles = await getAllArticles(0, PAGE_LIMIT, 'status=approved');
  return {
    props: {
      articles: articles ? articles : [],
    },
    revalidate: 10,
  };
};
