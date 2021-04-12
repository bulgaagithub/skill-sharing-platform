import Link from "next/link";
import { Spinner } from "react-bootstrap";

const Form = ({
  isLogin,
  errorMessage,
  onSubmit,
  action,
  csrfToken,
  loading,
}) => (
  <form onSubmit={onSubmit} action={action}>
    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    {!isLogin && (
      <label>
        <span>Нэр</span>
        <input type="text" name="username" required />
      </label>
    )}
    <label>
      <span>И-мэйл</span>
      <input type="email" name="email" required />
    </label>
    <label>
      <span>Нууц үг</span>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>Нууц үг давт</span>
        <input type="password" name="rpassword" required />
      </label>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup" disabled={loading ? true : false}>
            <a>Бүртгүүлэх</a>
          </Link>
          <button type="submit" disabled={loading ? true : false}>
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ marginRight: "10px" }}
              />
            )}
            Нэвтрэх
          </button>
        </>
      ) : (
        <>
          <Link href="/login" disabled={loading ? true : false}>
            <a>Нэвтрэх</a>
          </Link>
          <button type="submit" disabled={loading ? true : false}>
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ marginRight: "10px" }}
              />
            )}
            Бүртгүүлэх
          </button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `}</style>
  </form>
);

export default Form;
