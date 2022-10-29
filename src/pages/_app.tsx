import { Navbar } from "components"
import type { AppProps } from "next/app"
import "styles/globals.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
