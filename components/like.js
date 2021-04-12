import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { RiThumbUpLine } from "@react-icons/all-files/ri/RiThumbUpLine";
import { Spinner } from "react-bootstrap";
import { useGlobal } from "hooks/use-global";

export default function Like({ article }) {
  const [isLike, setIsLike] = useState(false);

  const { temparticle, loading, setLoading, setArticle } = useGlobal();

  useEffect(() => {
    if (article) {
        setArticle(article)
    }
  }, [article]);

  async function handleLike () {
    try {
        setIsLike(true);
        setLoading(true);
        const body = {
          articleId: article?._id,
          type: "like",
        };
        await fetch(
          "http://localhost:9000/api/v1/likes/like-dislike",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          } 
        );
        setLoading(false);
        const like = temparticle;


      } catch (error) {
        setLoading(false);
      }
  };

  return (
    <div>
      {/* {temparticle != null && <pre>{JSON.stringify(temparticle, null, 2)}</pre>}  */}
      <Button className="mt-4" variant="outline-secondary" onClick={handleLike} disabled={isLike ? true : false}>
        {loading && <Spinner animation="border" size="sm" />}
        <RiThumbUpLine /> Like
      </Button>
    </div>
  );
}
