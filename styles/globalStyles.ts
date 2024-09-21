// styles/GlobalStyle.ts
import { createGlobalStyle, DefaultTheme } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle