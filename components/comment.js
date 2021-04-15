import React, { useEffect, useState } from "react";
import moment from "moment";
import { RiWechat2Fill } from "@react-icons/all-files/ri/RiWechat2Fill";
import { RiThumbUpFill } from "@react-icons/all-files/ri/RiThumbUpFill";
import { useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { Box, Button } from "@chakra-ui/react";

import { useToasts } from "react-toast-notifications";

export default function Comment({ article }) {
  const [session] = useSession();
  const { temparticle, loading, setLoading, setArticle } = useGlobal();
  const [isComment, setIsComment] = useState(false);
  const { addToast } = useToasts();
  moment.locale("mn");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.comment.value === "") {
      addToast("Та коммент оруулна уу!", {
        appearance: "info",
        autoDismiss: 5000,
      });
    } else {
      const temp = { ...temparticle };
      try {
        setLoading(true);

        let today = new Date();
        let name = null;
        if (session) name = session?.user?.name;
        const newComment = {
          comment: e.currentTarget.comment.value,
          article: article._id,
          name: name,
          createdAt: today,
        };

        setIsComment(true);
        e.currentTarget.comment.value = "";
        temp.comments.push(newComment);

        setArticle(temp);
        setLoading(false);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(newComment),
          }
        );
      } catch (error) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (article) {
      setArticle(article);
    }
  }, [article]);
  return (
    <div className="wrapper">
      <div className="like-comment">
        <div className="like">
          <RiWechat2Fill /> <span> {article?.comments?.length}</span>
        </div>
        <div className="like">
          <RiThumbUpFill /> <span> {article?.likes}</span>
        </div>
      </div>
      <div className="comment-title">
        <h2>Comments</h2>
      </div>
      <div className="comment-body">
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            maxLength={250}
            name="comment"
            disabled={isComment ? true : false}
          ></textarea>
          <Button
            isLoading={loading}
            type="submit"
            disabled={isComment ? true : false}
            colorScheme="blue"
          >
            Илгээх
          </Button>
        </form>
        {/* {temparticle != null && (
          <pre>{JSON.stringify(temparticle, null, 2)}</pre>
        )} */}
        {article?.comments &&
          article.comments.map((comment, i) => (
            <Box
              mt={3}
              key={`${comment.createdAt}#${i}`}
              className="comment-list"
            >
              <span className="name">
                {comment.name ? comment.name : "Зочин"}{" "}
              </span>
              <span className="date">
                {moment(comment.createdAt, "YYYYMMDD").fromNow()}
              </span>
              <p>{comment.comment}</p>
            </Box>
          ))}
      </div>
      <style jsx>{`
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
