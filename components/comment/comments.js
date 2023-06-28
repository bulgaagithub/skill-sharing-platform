import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Reply from "components/reply";

const Comments = ({ article }) => {
    return (
        article?.comments &&
        article.comments.map((comment, i) => (
            <Box mt={3} key={`${comment.createdAt}#${i}`}>
                <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    padding={3}
                    bg="gray.200"
                    boxShadow="md"
                >
                    <Text fontSize="md" fontWeight="bold">{comment.name ? comment.name : "Зочин"} </Text>
                    <Text>{comment.comment}</Text>
                </Box>
                <Reply comment={comment} article={article} />
            </Box>
        ))
    );
};

export default Comments;
