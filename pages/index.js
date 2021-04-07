import { Row, Col, Button } from "react-bootstrap";
// import GridItem from "components/grid-item";
// import { getPaginatedPosts } from "lib/api";
import Layout from "components/layout";
import Intro from "components/intro";
import Search from "components/search";

// import { usePosts } from "hooks/use-posts";
import { useSWRInfinite } from "swr";

const PAGE_LIMIT = 3;
export default function Home() {
  // const { data, isLoading, error } = usePosts(posts);
//   const { data, isValidating, size, setSize } = useSWRInfinite(
//     (index) => `/api/posts/?page=${index}&limit=${PAGE_LIMIT}`,
//     {
//       initialData: [posts],
//     }
//   );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  return (
    <Layout>
      <Row>
        <Col md="8">
          <Intro />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Search />
        </Col>
      </Row>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <hr />

      {/* <Row className="mb-5">
        {data.map((page) =>
          page.map((post) => (
            <Col md={12 / PAGE_LIMIT} key={post.title}>
              <GridItem post={post} />
            </Col>
          ))
        )}
      </Row> */}
      {/* <div style={{ textAlign: "center" }}>
        {data[data.length - 1].length !== 0 &&
          (isValidating ? (
            <div>Түр хүлээнэ үү...</div>
          ) : (
            <Button onClick={() => setSize(size + 1)}>Цааш нь</Button>
          ))}
      </div> */}
    </Layout>
  );
}
