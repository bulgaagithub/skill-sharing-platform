import { Container, Box, Text } from "@chakra-ui/react";
import MyNavbar from "components/navbar";
const Layout = ({ children }) => {
  return (
    <Container maxW="container.lg" colorScheme="gray.500">
      <MyNavbar />
      {children}

      <Box
        p={5}
        h="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight="bold">© 2021 Skill Sharing Platform. All rights reserved.</Text>
      </Box>
    </Container>
  );
};

export default Layout;
