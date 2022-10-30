import { NextHead } from "components"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <>
      <NextHead title="Home" icon="/acquainted.svg" />
      <div className="h-screen"></div>
    </>
  )
}

export default Home
