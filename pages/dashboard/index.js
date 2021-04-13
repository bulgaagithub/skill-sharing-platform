import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { useSession } from "next-auth/client";
import Link from "next/link";

import Layout from "components/layout";
import SideBar from "components/sidebar";
import Article from "components/dashboard/article";
import Create from "components/dashboard/create";

import { getAllCategories } from "lib/api";

export default function Dashboard({ categories }) {
  const [session, loading] = useSession();
  const [active, setActive] = useState("articles");

  const activeChange = (active) => {
    setActive(active);
  };

  return (
      <Layout>
        {loading && <p>Loading</p>}

        {session && (
          <Row noGutters={false}>
            <Col md="3" sm className="mt-4 mx-2">
              <SideBar active={active} activeChange={activeChange} />
            </Col>

            <Col md="8" sm className="mt-4 mx-2">
              {active === "articles" ? (
                <Article categories={categories} />
              ) : (
                <Create categories={categories} />
              )}
            </Col>
          </Row>
        )}

        <br />

        {!session && (
          <>
            <Alert variant="info">
              <Alert.Heading>
                Та нийтлэл оруулахын тулд сайтад бүртгүүлж нэвтрэх ёстой <br />{" "}
                <Link href="/login">
                  <a>Нэвтрэх</a>
                </Link>{" "}
                дээр дарна уу.
              </Alert.Heading>
              <hr />
            </Alert>
          </>
        )}
      </Layout>
  );
}

export const getStaticProps = async () => {
  const categories = await getAllCategories();
  return {
    props: {
      categories: categories ? categories : [],
    },
  };
};
