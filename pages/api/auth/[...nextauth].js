import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.Credentials({
            name: ' Skill Sharing ',
            async authorize(credentials) {
                try {
                    const body = {
                        email: credentials.email,
                        password: credentials.password
                    }
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                    })
                    
                    const user = await res.json()
                
                    if (user.success) {
                        return user
                    } else {
                        return false
                    }
                } catch(e) {
                    const errorMessage = e.response.data.message
                    // Redirecting to the login page with error messsage in the URL
                    throw new Error(errorMessage)
                }
            },
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
          if (user.success) {
            return true
          } else {
            return false
          }
        },
        async redirect(url, baseUrl) {
          return baseUrl
        },
        async session(session, user) {
            if (user) {
                session.user = user.user.user;
                session.accessToken = user.accessToken;
            }
            return Promise.resolve(session)
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (user) {
                token.user = user;
                token.accessToken = user.token;
            }
            return Promise.resolve(token) 
        }
    },
    secret: process.env.SECRET,
    session: {
        jwt: true,
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        maxAge: 1 * 3 * 60 * 60, // 30 days
        // updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: '/login',
    },
    database: process.env.DATABASE_URL
}

// Email HTML body
const html = ({ url, site, email }) => {
    // Insert invisible space into domains and email address to prevent both the
    // email address and the domain from being turned into a hyperlink by email
    // clients like Outlook and Apple mail, as this is confusing because it seems
    // like they are supposed to click on their email address to sign in.
    const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
    const escapedSite = `${site.replace(/\./g, '&#8203;.')}`
  
    // Some simple styling options
    const backgroundColor = '#f9f9f9'
    const textColor = '#444444'
    const mainBackgroundColor = '#ffffff'
    const buttonBackgroundColor = '#346df1'
    const buttonBorderColor = '#346df1'
    const buttonTextColor = '#ffffff'
  
    // Uses tables for layout and inline CSS due to email client limitations
    return `
  <body style='background: ${backgroundColor};'>
    <table width='100%' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td align='center' style='padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};'>
          <strong>${escapedSite}</strong>
        </td>
      </tr>
    </table>
    <table width='100%' border='0' cellspacing='20' cellpadding='0' style='background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;'>
      <tr>
        <td align='center' style='padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};'>
          Sign in as <strong>${escapedEmail}</strong>
        </td>
      </tr>
      <tr>
        <td align='center' style='padding: 20px 0;'>
          <table border='0' cellspacing='0' cellpadding='0'>
            <tr>
              <td align='center' style='border-radius: 5px;' bgcolor='${buttonBackgroundColor}'><a href='${url}' target='_blank' style='font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;'>Sign in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align='center' style='padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};'>
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
  }
  
  // Email text body – fallback for email clients that don't render HTML
  const text = ({ url, site }) => `Sign in to ${site}\n${url}\n\n`

export default (req, res) => NextAuth(req, res, options)
