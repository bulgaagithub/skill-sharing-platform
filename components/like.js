import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { RiThumbUpLine } from "@react-icons/all-files/ri/RiThumbUpLine";
import { useGlobal } from "hooks/use-global";

export default function Like({ article }) {
  const [isLike, setIsLike] = useState(false);

  const { temparticle, loading, setLoading, setArticle } = useGlobal();

  async function handleLike() {
    try {
     const temp = { ...temparticle };
      setLoading(true);
      // const body = {
      //   articleId: article?._id,
      //   type: "like",
      // };

      setIsLike(true);
      temp.likes += 1;
      setArticle(temp);
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/articles/${article?._id}/like-dislike`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(body),
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* {temparticle != null && <pre>{JSON.stringify(temparticle, null, 2)}</pre>}  */}
      <Button
        isLoading={loading}
        loadingText="Loading"
        leftIcon={<RiThumbUpLine />}
        colorScheme="blue"
        variant="solid"
        onClick={handleLike}
        disabled={isLike ? true : false}
        mt={3}
      >
        Like
      </Button>
    </div>
  );
}
