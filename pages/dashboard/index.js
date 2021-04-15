import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Grid, GridItem, Alert, Text, Box, Button } from "@chakra-ui/react";

import Layout from "components/layout";
import SideBar from "components/sidebar";
import Article from "components/dashboard/article/index";
import User from "components/dashboard/user/index";
import Create from "components/dashboard/create";

import { useGlobal } from "hooks/use-global";

import { getAllCategories } from "lib/api";

export default function Dashboard({ categories }) {
  const [session] = useSession();
  const { activeSide } = useGlobal();

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
            <SideBar />
          </GridItem>

          <GridItem colSpan={{ sm: 5, md: 4 }}>
            {activeSide === "articles" ? (
              <Article categories={categories} />
            ) : activeSide === "add" ? (
              <Create categories={categories} />
            ) : (
              <User />
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
              <Button onClick={() => onLink("/login")}>
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
