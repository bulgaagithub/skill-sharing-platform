import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
export default function Comment({ article }) {
  moment.locale("mn");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="wrapper">
        <div className="like-comment">
            <div className="like">
                <FontAwesomeIcon icon={faCommentDots} /> <span> { article?.comments?.length }</span>
            </div>
            <div className="like">
                <FontAwesomeIcon icon={faThumbsUp} style={{color: "#007bff"}}/> <span> { article?.likes }</span>
            </div>
        </div>
      <div className="comment-title">
        <h2>Comments</h2>
      </div>
      <div className="comment-body">
        {article?.comments &&
          article.comments.map((comment, i) => (
            <div key={comment._id} className="comment-list">
              <span className="name">{comment.name} </span>
              <span className="date">
                {moment(comment.createdAt, "YYYYMMDD").fromNow()}
              </span>
              <p>{comment.comment}</p>
            </div>
          ))}
        <form>
          <textarea rows={3} maxLength={250}></textarea>
          <Button type="submit" onClick={handleSubmit}>
            Илгээх
          </Button>
        </form>
      </div>

      <style jsx>{`
        .like, .like-comment {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .like span {
            margin: 0px 15px 0px 5px;
            font-size: 1rem;
            font-weight: 700;
        }
        .wrapper {
          display: block;
          margin: 50px auto;
        }
        .comment-title {
          border-bottom: 2px solid #007bff;
          margin: 10px 0px;
        }
        .comment-title h2 {
          font-weight: 700;
        }
        .comment-list p {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .comment-list .name {
          font-size: 1rem;
          font-weight: normal;
          color: rgba(0, 0, 0, 0.45);
        }
        .comment-list .date {
          font-size: 1rem;
          font-weight: 700;
          color: rgb(205, 205, 205);
        }
        textarea {
          width: 100%;
          background: #fff;
          border: 1px solid transparent;
          border-radius: 8px;
          box-shadow: 1px 1px 10px #ccc;
          outline: #ccc;
          padding: 10px;
          font-size: 1rem;
        }
        h2 {
          margin-top: 10px;
          margin-bottom: 0px;
        }
      `}</style>
    </div>
  );
}

{
  /* <pre>{JSON.stringify(comments, null, 2)}</pre> */
}
