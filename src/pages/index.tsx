import type { NextPage } from "next"
import { FormEvent, useState } from "react"

interface CredentialsProps {
  username: string
  gameUid: number
}

const Home: NextPage = () => {
  const [credentials, setCredentials] = useState<CredentialsProps>({ username: "", gameUid: 0 })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">
        <h1>Update your pity number easily!</h1>
      </div>
      <form className="flex flex-col items-stretch w-full max-w-[400px] mt-10 gap-6" onSubmit={handleSubmit}>
        <div className="font-semibold flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            onChange={e => setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value })}
            name="username"
            type="text"
            id="username"
            className="py-4 px-3 h-12 rounded bg-slate-800 w-full focus:outline-none focus:ring-2 ring-pink-300"
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
            className="py-4 px-3 h-12 rounded bg-slate-800 w-full focus:outline-none focus:ring-2 ring-pink-300"
          />
        </div>
        <button
          className="mt-4 py-3 px-4 bg-pink-300 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-pink-200 focus:ring-2 ring-white"
          type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Home
