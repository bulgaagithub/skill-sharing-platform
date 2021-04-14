import React from "react";
import MyEditor from "components/editor/index";
import { Button } from "@chakra-ui/react";
import Alert from "react-bootstrap/Alert";

export default function Review({ article, categories, handleReview }) {

  return (
    <div>
      {/* {article && <pre>{JSON.stringify(article, null, 2)}</pre>} */}
      <Alert variant="secondary" className="mt-2">
        Нийтлэлийг засварлах хэсэг{" "}
        <Button className="ml-2" colorScheme="blue" onClick={() => handleReview(null)}>Хаах</Button>
      </Alert>
      <MyEditor
        type="review"
        data={article}
        categories={categories}
      />
    </div>
  );
}
