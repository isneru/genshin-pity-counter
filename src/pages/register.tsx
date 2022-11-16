import clsx from "clsx"
import { LoadingSpinner, NextHead } from "components"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { api } from "service"
import { ThemeContext } from "utils/ThemeProvider"

interface CredentialsProps {
  name: string
  gameUid: number
}

const Register: NextPage = () => {
  const { theme } = useContext(ThemeContext)
  const [credentials, setCredentials] = useState<CredentialsProps>({ name: "", gameUid: 0 })
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function createUser(data: CredentialsProps) {
    setIsRegisterLoading(true)
    try {
      api
        .post("/createUser", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          refreshData()
          setIsRegisterLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <NextHead title="Create Account" icon="/intertwined.svg" />
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">
          <h1>Update your pity number easily!</h1>
        </div>
        <form
          className="flex flex-col items-stretch w-full max-w-[400px] mt-10 gap-6"
          onSubmit={e => {
            e.preventDefault()
            createUser(credentials)
          }}>
          <div className="font-semibold flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Username
            </label>
            <input
              onChange={e => setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value })}
              name="name"
              type="text"
              id="name"
              className={clsx(
                "py-4 px-3 h-12 rounded w-full focus:outline-none focus:ring-2 ",
                `bg-${theme}/50 hover:bg-${theme} ring-${theme}`
              )}
            />
          </div>
          <div className="font-semibold flex flex-col gap-2">
            <label htmlFor="gameUid" className="font-semibold">
              In Game UID
            </label>
            <input
              onChange={e => setCredentials({ ...credentials, [e.currentTarget.name]: Number(e.currentTarget.value) })}
              name="gameUid"
              type="text"
              id="gameUid"
              className={clsx(
                "py-4 px-3 h-12 rounded w-full focus:outline-none focus:ring-2 ",
                `bg-${theme}/50 hover:bg-${theme} ring-${theme}`
              )}
            />
          </div>
          <button
            disabled={isRegisterLoading}
            className={clsx(
              "mt-4 py-3 px-4  rounded font-semibold text-sm w-full transition-colors focus:ring-2 flex items-center justify-center",
              `bg-${theme}/50 hover:bg-${theme} ring-${theme}`
            )}
            type="submit">
            Sign Up
          </button>
          {isRegisterLoading && <LoadingSpinner />}
        </form>
      </div>
    </>
  )
}

export default Register
