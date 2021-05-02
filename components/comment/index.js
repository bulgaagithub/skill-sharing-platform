import React, { useEffect, useState } from "react";
import moment from "moment";
import { RiWechat2Fill } from "@react-icons/all-files/ri/RiWechat2Fill";
import { RiThumbUpFill } from "@react-icons/all-files/ri/RiThumbUpFill";
import { useSession } from "next-auth/client";
import { useGlobal } from "hooks/use-global";
import { Box, Button, Text, Textarea, Divider} from "@chakra-ui/react";

import { useToasts } from "react-toast-notifications";
import Comments from "./comments";

export default function Comment({ article }) {
  const [session] = useSession();
  const { temparticle, loading, setLoading, setArticle } = useGlobal();
  const [isComment, setIsComment] = useState(false);
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

  useEffect(() => {
    if (article) {
      setArticle(article);
    }
  }, [article]);
  return (
    <Box mt={10}>
      <Box d="flex" alignItems="center" justifyContent="flex-start" w="100%">
        <Box d="flex" alignItems="center" justifyContent="flex-start">
          <RiWechat2Fill /> <Text> {article?.comments?.length}</Text>
        </Box>
        <Box d="flex" alignItems="center" justifyContent="flex-start" ml={2}>
          <RiThumbUpFill /> <Text ml={1}> {temparticle?.likes}</Text>
        </Box>
      </Box>
      <Text fontSize="2xl">Comments</Text>
      <Divider orientation="horizontal" size="md" color="blue" my={2}/>
      <Box>
        <form onSubmit={handleSubmit}>
          <Textarea
            bg="white"
            rows={3}
            name="comment"
            disabled={isComment ? true : false}
            boxShadow="md"
            borderRadius="8px"
            border="1px"
            outline="green"
          ></Textarea>
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
        <Comments article={article} />
      </Box>
    </Box>
  );
}
