import moment from "moment";
import { abbreviateNumber } from 'utils/abbreviateNum';
import { RiEyeLine } from "@react-icons/all-files/ri/RiEyeLine";
import { Box, Heading, Text } from "@chakra-ui/react";
const PostHeader = ({ post }) => {
    moment.locale("mn");
    return (
        <Box>
            {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            <Heading>
                {post.title}
            </Heading>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
                <Text mr={2}>{moment(post.createdAt).format("lll")} Нийтэлсэн: {post.author?.name}</Text> <RiEyeLine /> <Text ml={1}>{abbreviateNumber(post.reader_access)}</Text>
            </Box>

            {/* <h2 className="blog-detail-header-subtitle mb-3">{post.summary}</h2> */}
            {/* <img
        className="img-fluid rounded"
        src={urlFor(post.cover_image).height(800).url()}
        alt={post.cover_image.alt}
      /> */}
            {/* <div className="code-filename">{post.cover_image.alt}</div> */}
        </Box>
    );
};

export default PostHeader;
