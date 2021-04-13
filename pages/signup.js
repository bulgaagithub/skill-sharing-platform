import { useState } from "react";
import Router from "next/router";
import Layout from "components/layout";
import Form from "components/form";
import { useToasts } from "react-toast-notifications";
import { useGlobal } from "hooks/use-global";

const Signup = () => {
  const { addToast } = useToasts();
  const [errorMsg, setErrorMsg] = useState("");
  const { setLoading } = useGlobal();

  async function handleSubmit(values) {
    if (errorMsg) setErrorMsg("");

    const body = {
      name: values.username,
      email: values.email,
      password: values.password,
    };

    if (body.password !== values.rpassword) {
      setErrorMsg(`Нууц үг тохирохгүй байна.`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {
        addToast("Бүртгэгдлээ", { appearance: "success" });
        Router.push("/login");
      } else {
        throw new Error(await res.text());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "An unexpected error happened occurred:",
        error.message.message
      );
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form
          isLogin={false}
          errorMessage={errorMsg}
          handleSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default Signup;
