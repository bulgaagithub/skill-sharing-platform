import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Button, Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { signIn, useSession } from "next-auth/client";
import SideBar from "components/sidebar";
import Article from "components/dashboard/article";
import Create from "components/dashboard/create";
import { getAllCategories } from "lib/api";
import { GlobalProvider } from "context/global-context";
import Alert from "react-bootstrap/Alert";
import Link from "next/link";

export default function Dashboard({ categories }) {
  const [session, loading] = useSession();
  const [active, setActive] = useState("articles");
  const router = useRouter();

  const activeChange = (active) => {
    setActive(active);
  };

  return (
    <GlobalProvider>
      <Layout>
        {loading && <p>Loading</p>}

        {session && (
          <Row noGutters={true}>
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
              <Alert.Heading>Та нийтлэл оруулахын тулд сайтад бүртгүүлж нэвтрэх ёстой <br/> <Link href='/login'><a>Нэвтрэх</a></Link> дээр дарна уу.</Alert.Heading>
              <hr />
              {/* <Button variant="primary" onClick={() => signIn()}>
                Нэвтрэх
              </Button> */}
            </Alert>
          </>
        )}
      </Layout>
    </GlobalProvider>
  );
}

export const getStaticProps = async () => {
  const categories = await getAllCategories();
  return {
    props: {
      categories,
    },
  };
};
