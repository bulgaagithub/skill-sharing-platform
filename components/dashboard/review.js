import MyEditor from "components/editor";
import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { signOut, useSession } from "next-auth/dist/client";
import { useGlobal } from "hooks/use-global";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";

export default function Review({ article, categories, handleReview }) {
  const [session] = useSession();
  const { setLoading } = useGlobal();
  const { addToast } = useToasts();

  const handleSubmit = async (e, editorValue) => {
    e.preventDefault();

    const body = {
      title: e.currentTarget.title.value,
      summary: e.currentTarget.summary.value,
      content: editorValue,
      category: e.currentTarget.category.value,
      status: e.currentTarget.status.value,
      articleId: article._id,
      approvedAt: Date.now(),
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/api/v1/articles/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setLoading(false);
        addToast("Засагдлаа", { appearance: "success" });
        Router.push("/dashboard");
      } else {
        setLoading(false);
        throw new Error(await res.text());
      }
    } catch (error) {
      setLoading(false);
      addToast(error.message, { appearance: "error" });
      if (error.statusCode === 401) {
        setTimeout(() => {
          signOut();
        }, 1000);
      }
      console.error("An unexpected error happened occurred:", error);
    }
  };

  return (
    <div>
      {/* {article && <pre>{JSON.stringify(article, null, 2)}</pre>} */}
      <Alert variant="secondary" className="mt-2">
        Нийтлэлийг засварлах хэсэг{" "}
        <Button onClick={() => handleReview(null)}>Хаах</Button>
      </Alert>
      <MyEditor
        data={article}
        categories={categories}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
