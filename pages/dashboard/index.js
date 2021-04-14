import { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "components/layout";
import SideBar from "components/sidebar";
import Article from "components/dashboard/article/index";
import Create from "components/dashboard/create";

import { getAllCategories } from "lib/api";

import { Grid, GridItem, Alert, Text, Box, Button } from "@chakra-ui/react";

export default function Dashboard({ categories }) {
  const [session, loading] = useSession();
  const [active, setActive] = useState("articles");

  const activeChange = (active) => {
    setActive(active);
  };

  const router = useRouter();

  const onLink = (href) => {
    router.push(href);
  };

  return (
    <Layout>
      {session && (
        <Grid
          templateRows="repeat(1, 2fr)"
          gap={4}
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(5, 2fr)" }}
        >
          <GridItem colSpan={{ sm: 5, md: 1 }}>
            <SideBar active={active} activeChange={activeChange} />
          </GridItem>

          <GridItem colSpan={{ sm: 5, md: 4 }}>
            {active === "articles" ? (
              <Article categories={categories} />
            ) : (
              <Create categories={categories} />
            )}
          </GridItem>
        </Grid>
      )}

      <br />

      {!session && (
        <>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box>
              <Text className="mx-2" fontSize="1.5rem">
                Та нийтлэл оруулахын тулд сайтад бүртгүүлж нэвтрэх хэрэгтэй.
              </Text>
            </Box>

            <Box className="mt-2">
              <Button onClick={()=> onLink('/login')}>
                <Text className="mx-1" fontSize="1.5rem" color="tomato">
                  Нэвтрэх
                </Text>
              </Button>
            </Box>
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
