import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Layout from "components/layout";
import Form from "components/form";
import { getCsrfToken, signIn, useSession } from "next-auth/client";

const Login = ({ csrfToken }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [session] = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    // e.preventDefault();
    setLoading(true);
    if (errorMsg) setErrorMsg("");
    const login = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      url: `http://localhost:9000/dashboard`,
      callBackUrl: `http://localhost:9000/dashboard`,
    });

    if (login?.status === 200) {
      setLoading(false);
      router.push("/dashboard");
    } else {
      setLoading(false);
      setErrorMsg("Имэйл болон нууц үгээ зөв оруулна уу.");
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
            handleSubmit={handleSubmit}
            action="/api/auth/callback/credentials"
            csrfToken={csrfToken}
            loading={loading}
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
