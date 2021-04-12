import { Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { getArticleBySlug, getAllArticles } from "lib/api";
import moment from "moment";
import PostHeader from "components/post-header";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
import Comment from "components/comment";
import Like from "components/like";
import { GlobalProvider } from "context/global-context";

const ArticleDetail = ({ article }) => {
  moment.locale("mn");
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!router.isFallback && !article?.slug) {
    return (
      <Layout>
        <div>Уучлаарай ийм нийтлэл байхгүй байна.</div>
      </Layout>
    );
  }

  return (
    <GlobalProvider>
      <Layout>
        <Row>
          <Col md="12">
            <PostHeader post={article} />
            <br />
            <div>{ReactHtmlParser(article.content)}</div>
          </Col>
        </Row>

        <Like article={article} />
        <Comment article={article} />
      </Layout>
    </GlobalProvider>
  );
};

export const getStaticProps = async ({ params }) => {
  const article = await getArticleBySlug(params.slug);
  return {
    props: {
      article: article[0],
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const articles = await getAllArticles(0, 4, 'status=approved');
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: true,
  };
};
export default ArticleDetail;
