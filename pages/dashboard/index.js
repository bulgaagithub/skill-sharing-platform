
import { useState } from "react";
import { Button, ListGroup, Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { signIn, signOut, useSession } from "next-auth/client";
import SideBar from "components/sidebar";
import Articles from "components/dashboard/articles";
import Create from "components/dashboard/create";
import { getAllCategories } from "lib/api";

export default function Dashboard({ categories }) {
  const [session, loading] = useSession();
  const [active, setActive] = useState("articles");

  const activeChange = (active) => {
      setActive(active)
  }

  return (
    <Layout>
      {loading && <p>Loading</p>}

      {session && (
          <Row noGutters={true}>
            <Col md="2" sm className="mt-4 mx-2">
              <SideBar active={active} activeChange={activeChange}/>
            </Col>
            
            <Col md="9" sm className="mt-4 mx-2">
            { active === 'articles' ? <Articles /> : <Create categories={categories} /> }
            </Col>
          </Row>
      )}

      <br />

      {!session && (
        <>
          Та нэвтэрнэ үү.
          <br />
          <Button variant="primary" onClick={() => signIn()}>
            Нэвтрэх
          </Button>
        </>
      )}
    </Layout>
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
