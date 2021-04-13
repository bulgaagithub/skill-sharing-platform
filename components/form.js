import Link from "next/link";
import { Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { FormControl, FormLabel, Input, Text, Button } from "@chakra-ui/react";

import { useGlobal } from "hooks/use-global";

const validate = (values) => {
  const errors = {};

  if (!values.login) {
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username?.length > 15) {
      errors.username = "Must be 15 characters or less";
    }

    if (!values.rpassword) {
      errors.rpassword = "Нууц үгээ давтана уу.";
    } else if (values.rpassword.length < 8) {
      errors.rpassword = "Нууц үг хамгийн багадаа 8 тэмдэгт";
    }
  }

  if (!values.password) {
    errors.password = "Нууц үг оруулна уу.";
  } else if (values.password.length < 8) {
    errors.password = "Нууц үг хамгийн багадаа 8 тэмдэгт";
  }

  if (!values.email) {
    errors.email = "И-мэйл хаяг оруулна уу.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Буруу и-мейл байна.";
  }

  return errors;
};

const Form = ({
  isLogin,
  errorMessage,
  handleSubmit,
  action,
  csrfToken
}) => {
  const { loading } = useGlobal();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      rpassword: "",
      login: true,
    },
    validate,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} action={action}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <input
        type="checkbox"
        name="login"
        id="login"
        onChange={formik.handleChange}
        value={formik.values.login}
        checked={isLogin ? true : false}
        hidden
      />
      {!isLogin && (
        <FormControl>
          <FormLabel htmlFor="name">Нэр</FormLabel>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            defaultValue={undefined}
          />
          {formik.errors.username ? (
            <Text
              fontSize="md"
              bgGradient="linear(to-l, #7928CA,#FF0000)"
              bgClip="text"
            >
              {formik.errors.username}
            </Text>
          ) : null}
        </FormControl>
      )}
      <FormControl>
        <FormLabel htmlFor="email">Имэйл</FormLabel>
        <Input
          type="email"
          name="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? (
          <Text
            fontSize="md"
            bgGradient="linear(to-l, #7928CA,#FF0000)"
            bgClip="text"
          >
            {formik.errors.email}
          </Text>
        ) : null}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Нууц үг</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.email ? (
          <Text
            fontSize="md"
            bgGradient="linear(to-l, #7928CA,#FF0000)"
            bgClip="text"
          >
            {formik.errors.password}
          </Text>
        ) : null}
      </FormControl>

      {!isLogin && (
        <FormControl>
          <FormLabel htmlFor="password">Нууц үг давт</FormLabel>
          <Input
            type="password"
            name="rpassword"
            id="rpassword"
            onChange={formik.handleChange}
            value={formik.values.rpassword}
          />
          {formik.errors.rpassword ? (
            <Text
              fontSize="md"
              bgGradient="linear(to-l, #7928CA,#FF0000)"
              bgClip="text"
            >
              {formik.errors.rpassword}
            </Text>
          ) : null}
        </FormControl>
      )}

      <div className="submit">
        {isLogin ? (
          <>
            <Link href="/signup" disabled={loading ? true : false}>
              <a>
                <Text className="mt-2" fontSize="1.5rem">
                  Бүртгүүлэх
                </Text>
              </a>
            </Link>
            <Button
              className="mt-4"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: "10px" }}
                />
              )}
              Нэвтрэх
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" disabled={loading ? true : false}>
              <a>
                <Text className="mt-2" fontSize="1.5rem">
                  Нэвтрэх
                </Text>
              </a>
            </Link>
            <Button
              className="mt-4"
              type="submit"
              disabled={loading ? true : false}
            >
              {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: "10px" }}
                />
              )}
              Бүртгүүлэх
            </Button>
          </>
        )}
      </div>

      {errorMessage && (
        <Text
          fontSize="1.5rem"
          bgGradient="linear(to-l, #7928CA,#FF0000)"
          bgClip="text"
        >
          {errorMessage}
        </Text>
      )}
    </form>
  );
};

export default Form;
