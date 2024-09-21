// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Inter } from 'next/font/google'
import theme from '@/styles/theme'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default MyApp