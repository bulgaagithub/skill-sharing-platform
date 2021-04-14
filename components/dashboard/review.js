import React from "react";
import MyEditor from "components/editor/index";
import {
  Button,
  Alert,
  CloseButton,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";

export default function Review({ article, categories, handleReview }) {
  return (
    <div>
      {/* {article && <pre>{JSON.stringify(article, null, 2)}</pre>} */}
      <Alert className="mt-2 mb-3">
        <AlertTitle mr={2}>Нийтлэлийг засварлах хэсэг</AlertTitle>
        <AlertDescription>арын товч дээр дарж хаана уу.</AlertDescription>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => handleReview(null)}
        />
      </Alert>
      <MyEditor type="review" data={article} categories={categories} />
    </div>
  );
}
