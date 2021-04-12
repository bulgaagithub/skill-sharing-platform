import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit, action, csrfToken }) => (
  <form onSubmit={onSubmit} action={action}>
    <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
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
          <Link href="/signup">
            <a>Бүртгүүлэх</a>
          </Link>
          <button type="submit">Нэвтрэх</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>Нэвтрэх</a>
          </Link>
          <button type="submit">Бүртгүүлэх</button>
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
)

export default Form
