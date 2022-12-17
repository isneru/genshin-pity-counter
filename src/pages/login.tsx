import clsx from "clsx"
import { LoadingSpinner, NextHead } from "components"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { api } from "service"
import { SessionContext, ThemeContext } from "utils/providers"

interface CredentialsProps {
  name: string
  password: string
}

const Login: NextPage = () => {
  const { theme } = useContext(ThemeContext)
  const { setSession, session } = useContext(SessionContext)
  const [credentials, setCredentials] = useState<CredentialsProps>({
    name: "",
    password: ""
  })
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)
  const router = useRouter()

  async function loginUser(data: CredentialsProps) {
    setIsLoginLoading(true)
    try {
      const newUser = await api.post("/loginUser", data)
      setIsLoginLoading(false)
      const userData = newUser.data.data
      setSession({ user: userData })
      console.log(session)
      router.push(`/profile/${userData.gameUid}`)
    } catch (error) {
      return error
    }
  }
  return (
    <>
      <NextHead title="Login" icon="/acquainted.svg" />
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-2xl font-bold">
          <h1>Update your pity number easily!</h1>
        </div>
        <form
          className="mt-10 flex w-full max-w-[400px] flex-col items-stretch gap-6"
          onSubmit={e => {
            e.preventDefault()
            loginUser(credentials)
          }}>
          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="name" className="font-semibold">
              Username
            </label>
            <input
              onChange={e =>
                setCredentials({
                  ...credentials,
                  [e.currentTarget.name]: e.currentTarget.value
                })
              }
              name="name"
              type="text"
              id="name"
              className={clsx("h-12 w-full rounded py-4 px-3 focus:outline-none focus:ring-2 ", {
                "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
                "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
                "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
                "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
                "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
                "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
                "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
              })}
            />
          </div>
          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={e =>
                setCredentials({
                  ...credentials,
                  [e.currentTarget.name]: e.currentTarget.value
                })
              }
              name="password"
              type="password"
              id="password"
              className={clsx("h-12 w-full rounded py-4 px-3 focus:outline-none focus:ring-2 ", {
                "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
                "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
                "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
                "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
                "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
                "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
                "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
              })}
            />
          </div>
          <button
            disabled={isLoginLoading}
            className={clsx(
              "mt-4 flex w-full items-center justify-center rounded py-3 px-4 text-sm font-semibold transition-colors focus:ring-2",
              {
                "bg-pyro/50 ring-pyro disabled:bg-pyro/25 hover:bg-pyro": theme === "pyro",
                "bg-anemo/50 ring-anemo disabled:bg-anemo/25 hover:bg-anemo": theme === "anemo",
                "bg-hydro/50 ring-hydro disabled:bg-hydro/25 hover:bg-hydro": theme === "hydro",
                "bg-electro/50 ring-electro disabled:bg-electro/25 hover:bg-electro": theme === "electro",
                "bg-dendro/50 ring-dendro disabled:bg-dendro/25 hover:bg-dendro": theme === "dendro",
                "bg-cryo/50 ring-cryo disabled:bg-cryo/25 hover:bg-cryo": theme === "cryo",
                "bg-geo/50 ring-geo disabled:bg-geo/25 hover:bg-geo": theme === "geo"
              }
            )}
            type="submit">
            Sign Up
          </button>
          {isLoginLoading && <LoadingSpinner />}
        </form>
      </div>
    </>
  )
}

export default Login
