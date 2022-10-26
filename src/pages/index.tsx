import type { NextPage } from "next"
import { useState } from "react"

interface CredentialsProps {
  name: string
  gameUid: number
}

const Home: NextPage = () => {
  const [credentials, setCredentials] = useState<CredentialsProps>({ name: "", gameUid: 0 })

  async function createUser(data: CredentialsProps) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }).then(() => setCredentials({ name: "neru", gameUid: 1 }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (data: CredentialsProps) => {
    try {
      createUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-2xl font-bold">
        <h1>Update your pity number easily!</h1>
      </div>
      <form
        className="flex flex-col items-stretch w-full max-w-[400px] mt-10 gap-6"
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(credentials)
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
