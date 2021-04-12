import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Layout from "components/layout";
import Form from "components/form";
import { getCsrfToken, signIn, useSession } from "next-auth/client";

const Login = ({ csrfToken }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [session] = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMsg) setErrorMsg("");
    const login = await signIn("credentials", {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      redirect: false,
      url: `http://localhost:9000/dashboard`,
    });

    if (login?.status === 200) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <Layout>
      <div className="login">
        {!session && (
          <Form
            isLogin
            errorMessage={errorMsg}
            onSubmit={handleSubmit}
            action="/api/auth/callback/credentials"
            csrfToken={csrfToken}
          />
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
