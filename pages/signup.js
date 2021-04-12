import { useState } from "react";
import Router from "next/router";
import Layout from "components/layout";
import Form from "components/form";
import { useToasts } from "react-toast-notifications";

const Signup = () => {
  //   useUser({ redirectTo: '/', redirectIfFound: true })
  const { addToast } = useToasts();
  const [errorMsg, setErrorMsg] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch("http://localhost:9000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        addToast('Бүртгэгдлээ', { appearance: "success" });
        Router.push("/login");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
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
        <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default Signup;
