import moment from "moment";
import {abbreviateNumber} from 'utils/abbreviateNum';
import { RiEyeLine } from "@react-icons/all-files/ri/RiEyeLine";
const PostHeader = ({ post }) => {
  moment.locale("mn");
  return (
    <div className="blog-detail-header">
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {post.title}
      </h1>
      <p className="lead mb-0">
        {moment(post.createdAt).format("lll")} Нийтэлсэн: {post.author?.name} <RiEyeLine /> {abbreviateNumber(post.reader_access)}
      </p>
      
      {/* <h2 className="blog-detail-header-subtitle mb-3">{post.summary}</h2> */}
      {/* <img
        className="img-fluid rounded"
        src={urlFor(post.cover_image).height(800).url()}
        alt={post.cover_image.alt}
      /> */}
      {/* <div className="code-filename">{post.cover_image.alt}</div> */}
    </div>
  );
};

export default PostHeader;
