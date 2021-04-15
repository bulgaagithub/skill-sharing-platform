import { Box, Text, Alert } from "@chakra-ui/react";
const Intro = () => (
  <Alert
    status="success"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    height="200px"
    bg="green.600"
    mb={5}
  >
    <Box maxWidth="sm">
      <Text fontSize="1.5rem" fontWeight="bold" color="#fff">
        Мэдээлэл технологийн сонирхолтой мэдээллүүд
      </Text>
    </Box>
  </Alert>
);
export default Intro;
