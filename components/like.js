import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function Like({ article }) {
  const [loading, setLoading] = useState(false);

  async function handleLike () {
    try {
        const body = {
          articleId: article?._id,
          type: "like",
        };
        const res = await fetch(
          "http://localhost:9000/api/v1/articles/like-dislike",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        console.log(res)
      } catch (error) {
          console.log(error)
      }
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={handleLike}>
        {/* {loading && <Spinner animation="grow" size="sm" />} */}
        <FontAwesomeIcon icon={faThumbsUp} /> Like
      </Button>
    </div>
  );
}
