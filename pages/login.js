import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Layout from 'components/layout'
import Form from 'components/form'
import { getCsrfToken, signIn } from 'next-auth/client'

const Login = ({ csrfToken }) => {

  const [errorMsg, setErrorMsg] = useState('')  
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    signIn('credentials', { 
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        callbackUrl: `${window.location.origin}/profile` 
    })
  }

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setErrorMsg(router.query.error) // Shown below the input field in my example
    }
  }, [router])

  return (
    <Layout>
      <div className="login">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} action='/api/auth/callback/credentials' csrfToken={csrfToken} />
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
  )
}

export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context)
      }
    }
}

export default Login
