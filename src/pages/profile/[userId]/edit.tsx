import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { api, prisma } from "service"

interface UserProfileProps {
  user: UserDataProps
}

interface UserDataProps {
  id: string
  name: string
  gameUid: number
  wishes: {
    weapon: number
    event: number
    standard: number
  }
}

const EditProfile: NextPage<UserProfileProps> = ({ user }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserDataProps>(user)
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  async function createUser(data: UserDataProps) {
    try {
      api
        .post("/editUser", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          refreshData()
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <NextHead title="Edit Profile" icon="/intertwined.svg" />
      <div className="h-screen w-full flex justify-center items-center -mt-20">
        <form
          onSubmit={e => {
            e.preventDefault()
            createUser(userData)
          }}
          className="flex flex-col justify-center items-stretch max-w-[400px]">
          <div className="bg-slate-900 py-4 px-6 rounded flex gap-4">
            <div className="flex flex-col items-center justify-center px-10">
              <strong className="text-2xl leading-none font-semibold">{user.name}</strong>
              <span className="text-base text-zinc-400">{user.gameUid}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="event">Event Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: { ...userData.wishes, [e.currentTarget.name]: e.currentTarget.valueAsNumber }
                    })
                  }
                  type="number"
                  id="event"
                  name="event"
                  min={0}
                  max={90}
                  className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300"
                  defaultValue={user.wishes.event}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="weapon">Weapon Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: { ...userData.wishes, [e.currentTarget.name]: e.currentTarget.valueAsNumber }
                    })
                  }
                  type="number"
                  id="weapon"
                  name="weapon"
                  min={0}
                  max={80}
                  className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300"
                  defaultValue={user.wishes.weapon}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="standard">Standard Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: { ...userData.wishes, [e.currentTarget.name]: e.currentTarget.valueAsNumber }
                    })
                  }
                  type="number"
                  id="standard"
                  name="standard"
                  min={0}
                  max={90}
                  className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300"
                  defaultValue={user.wishes.standard}
                />
              </div>
            </div>
          </div>
          <button
            className="mt-4 py-3 px-4 bg-slate-900 rounded font-semibold text-md transition-colors hover:bg-slate-800 focus:ring-2 ring-white"
            type="submit">
            Confirm Changes
          </button>
        </form>
      </div>
    </>
  )
}

export default EditProfile

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = String(params!.userId)
  const user = await prisma!.user.findUnique({
    select: {
      id: true,
      name: true,
      gameUid: true,
      wishes: true
    },
    where: { id: userId }
  })

  if (user) {
    return {
      props: {
        user
      }
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/register"
    }
  }
}
