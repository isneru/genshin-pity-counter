import { Navbar } from "components"
import type { AppProps } from "next/app"
import "styles/globals.css"
import { ThemeProvider } from "utils/ThemeProvider"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <div className="h-screen max-h-screen flex flex-col sm:flex-row">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default MyApp
