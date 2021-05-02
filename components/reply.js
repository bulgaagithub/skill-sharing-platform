import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { Box, Button, Text, Textarea } from "@chakra-ui/react";

import { useToasts } from "react-toast-notifications";
import TextArea from "./comment/text-area";

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
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <Text
          cursor="pointer"
          fontSize="14px"
          fontWeight="bold"
          color="gray.500"
          onClick={() => setOpen(!open)}
        >
          Reply
        </Text>
        <Text ml="2" color="gray.500">
          {moment(comment.createdAt).fromNow()}
        </Text>
      </Box>
      <Box ml={5}>
        {article?.replies &&
          article.replies.map(
            (reply, i) =>
              reply.parent === comment._id && (
                <Box key={`${reply.createdAt}#${i}`}>
                  <Box
                    my={3}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    padding={2}
                    bg="blue.50"
                    boxShadow="md"
                  >
                    <Text fontSize="md" fontWeight="bold">{reply.name ? reply.name : "Зочин"} </Text>
                    <Text fontSize={12}>{reply.comment}</Text>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Text
                        cursor="pointer"
                        fontWeight="bold"
                        color="gray.500"
                        fontSize="sm"
                        onClick={() => {
                          setOpenSub(!openSub);
                          setMention(reply.name ? reply.name : "");
                        }}
                      >
                        Reply
                      </Text>

                      <Text ml="2" fontSize="sm" color="gray.500">
                        {moment(reply.createdAt).fromNow()}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )
          )}
        {openSub && (
          <TextArea
            loading={loading}
            handleSubmit={handleSubmit}
            mention={mention}
          />
        )}
      </Box>
      {open && (
        <TextArea
          loading={loading}
          handleSubmit={handleSubmit}
          mention={mention}
        />
      )}
    </Box>
  );
}
