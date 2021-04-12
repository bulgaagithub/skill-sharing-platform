import Editor from "components/editor";
import { useGlobal } from "hooks/use-global";
import { useSession, signOut } from "next-auth/dist/client";
import Router from "next/router";
import { useToasts } from "react-toast-notifications";

export default function Create({ categories }) {
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
    };
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9000/api/v1/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setLoading(false);
        addToast('Хадгалагдлаа', { appearance: "success" });
        Router.push("/dashboard");
      } else {
        setLoading(false);
        addToast(res.messge, { appearance: "info" });
        throw new Error(await res.text());
      }
    } catch (error) {
      setLoading(false);
      if (error.statusCode === 401) {
        addToast(error.messge, { appearance: "error" });
        signOut();
      }
      console.error("An unexpected error happened occurred:", error);
    }
  };

  return <Editor categories={categories} handleSubmit={handleSubmit} />;
}
