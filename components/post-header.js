import moment from "moment";
import { urlFor } from "lib/api";
const PostHeader = ({ post }) => {
  moment.locale("mn");
  return (
    <div className="blog-detail-header">
      <p className="lead mb-0">
        {post.title}, {moment(post.createdAt).format("lll")}
      </p>
      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {post.title}
      </h1>
      <h2 className="blog-detail-header-subtitle mb-3">{post.summary}</h2>
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
