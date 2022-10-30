import { LoadingSpinner, NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { api, prisma } from "service"

interface DataProps {
  users: {
    id: string
    name: string
    gameUid: number
  }[]
}

interface CredentialsProps {
  name: string
  gameUid: number
}

const Register: NextPage<DataProps> = ({ users }: DataProps) => {
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
      <div className="mt-20 w-full flex flex-col items-center justify-center">
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
              className="py-4 px-3 h-12 rounded bg-slate-900 w-full focus:outline-none focus:ring-2 ring-pink-300"
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
              className="py-4 px-3 h-12 rounded bg-slate-900 w-full focus:outline-none focus:ring-2 ring-pink-300"
            />
          </div>
          <button
            disabled={isRegisterLoading}
            className="mt-4 py-3 px-4 bg-pink-300 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-pink-200 focus:ring-2 ring-white flex items-center justify-center"
            type="submit">
            Sign Up
          </button>
          {isRegisterLoading && <LoadingSpinner />}
        </form>
        <ul className="mt-14 flex flex-col items-stretch w-full max-w-[400px] max-h-[35vh] overflow-y-auto gap-4">
          {users.map(user => (
            <li key={user.id} className="bg-slate-900 px-4 py-3 rounded-sm flex gap-2">
              <div className="flex-1 text-center">
                <Link href={`/profile/${user.id}`}>
                  <span>{user.name}</span>
                </Link>
              </div>
              <div className="w-[1px] h-full bg-white/20" />
              <div className="flex-1 text-center">
                <span>UID {user.gameUid}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Register

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma!.user.findMany({
    select: {
      id: true,
      name: true,
      gameUid: true,
      wishes: true
    }
  })

  return {
    props: {
      users
    }
  }
}
