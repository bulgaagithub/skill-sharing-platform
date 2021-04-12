import Editor from "components/editor";
import { useGlobal } from "hooks/use-global";
import { useSession } from "next-auth/dist/client";
import Router from "next/router";

export default function Create({ categories }) {

  const [session] = useSession();
  const { setLoading } = useGlobal();

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
            Router.push("/dashboard");
          } else {
            setLoading(false);
            throw new Error(await res.text());
          }
        } catch (error) {
          setLoading(false);
          console.error("An unexpected error happened occurred:", error);
        }
    };

  return <Editor categories={categories} handleSubmit={handleSubmit}/>;
}
