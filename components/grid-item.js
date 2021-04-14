import { Box, Text, Badge } from "@chakra-ui/react";

import Link from "next/link";
import moment from "moment";
const GridItem = ({ article }) => {
  moment.locale("mn");
  return (
    <Box
      mb={5}
      bg="white"
      boxShadow="md"
      className="px-4 pt-4 pb-3"
      rounded="md"
    >
      <Box>
        <Link href={`/${article.slug}`}>
          <a>
            <Text fontWeight="bold" fontSize="20px" mb={1}>
              {article.title}
            </Text>
          </a>
        </Link>
        <Text>{article.summary}</Text>
        <Box
          my={2}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Text mr={2}>
            {moment(article.createdAt).format("lll")} Нийтлэлч:{" "}
            {article.author?.name}
          </Text>{" "}
          <Badge>{article.category?.name}</Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default GridItem;
