import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { Box, Button, Text } from "@chakra-ui/react";

import { useToasts } from "react-toast-notifications";

export default function Reply({ comment, article }) {
  const [session] = useSession();
  const { temparticle, loading, setLoading, setArticle } = useGlobal();
  const [isReply, setIsReply] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [mention, setMention] = useState(null);
  const { addToast } = useToasts();
  moment.locale("en");

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
        setOpen(false);
        setOpenSub(false);

        let today = new Date();
        let name = null;
        if (session) name = session?.user?.name;
        const newComment = {
          parent: comment._id,
          comment: e.currentTarget.comment.value,
          article: temparticle._id,
          name: name,
          createdAt: today,
        };

        setIsReply(true);
        e.currentTarget.comment.value = "";
        temp.replies.push(newComment);

        setArticle(temp);

        let headers = {};

        if (session) {
          headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          };
        } else {
          headers = {
            "Content-Type": "application/json",
          };
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/comments`,
          {
            method: "POST",
            headers: {
              ...headers,
            },
            body: JSON.stringify(newComment),
          }
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <span className="reply" fontSize="12px" onClick={() => setOpen(!open)}>
          Reply
        </span>
        <Text className="date" ml="2">
          {moment(comment.createdAt).fromNow()}
        </Text>
      </Box>
      <Box ml={5}>
        {article?.replies &&
          article.replies.map(
            (reply, i) =>
              reply.parent === comment._id && (
                <Box key={`${reply.createdAt}#${i}`}>
                  <span className="name">
                    {reply.name ? reply.name : "Зочин"}{" "}
                  </span>
                  <p>{reply.comment}</p>
                  <span
                    className="reply"
                    fontSize="12px"
                    onClick={() => { setOpenSub(!openSub); setMention(reply.name ? reply.name : '') }}
                  >
                    Reply
                  </span>
                </Box>
              )
          )}
        {openSub && (
          <Box w={300}>
            <div className="comment-body">
              <form onSubmit={handleSubmit}>
                <textarea
                  rows={3}
                  maxLength={250}
                  name="comment"
                >
                 {mention} 
                </textarea>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button
                    isLoading={loading}
                    type="submit"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    color="#fff"
                    size="sm"
                    _hover={{ bgGradient: "linear(to-l, #FF0080, #7928CA)" }}
                  >
                    Илгээх
                  </Button>
                </Box>
              </form>
            </div>
          </Box>
        )}
      </Box>
      {open && (
        <Box w={300}>
          <div className="comment-body">
            <form onSubmit={handleSubmit}>
              <textarea
                rows={3}
                maxLength={250}
                name="comment"
                disabled={isReply ? true : false}
              ></textarea>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  isLoading={loading}
                  type="submit"
                  disabled={isReply ? true : false}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  color="#fff"
                  size="sm"
                  _hover={{ bgGradient: "linear(to-l, #FF0080, #7928CA)" }}
                >
                  Илгээх
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      )}
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
        .reply {
          cursor: pointer;
          font-weight: bold;
          color: #b2b2b2;
        }
      `}</style>
    </Box>
  );
}
