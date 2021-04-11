import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toggle/style.css'
import '../styles/index.scss'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'context/theme-context'
import { Provider } from 'next-auth/client'

const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
        fetcher,
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
          }
        },
      }}
    >
      <ThemeProvider>
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
