import { Navbar, ThemeSwitcher } from "components"
import type { AppProps } from "next/app"
import "styles/globals.css"
import { SessionProvider, ThemeProvider } from "utils/providers"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="h-screen max-h-screen flex flex-col">
          <Navbar />
          <Component {...pageProps} />
          <ThemeSwitcher />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
