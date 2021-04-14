import { Container, Box } from "@chakra-ui/react";
import MyNavbar from "components/navbar";
const Layout = ({ children }) => {
  return (
    <Container maxW="container.lg">
      <MyNavbar />
      {children}
    </Container>
  );
};

export default Layout;
