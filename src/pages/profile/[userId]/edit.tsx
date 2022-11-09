import clsx from "clsx"
import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { api, prisma } from "service"
import { ThemeContext } from "utils/ThemeProvider"

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
  const { theme } = useContext(ThemeContext)
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
      <div className="container flex justify-center items-center">
        <form
          onSubmit={e => {
            e.preventDefault()
            createUser(userData)
          }}
          className="flex flex-col justify-center items-stretch max-w-[600px]">
          <div
            className={clsx("py-4 px-6 rounded flex gap-4", {
              "bg-pyro/50": theme === "pyro",
              "bg-anemo/50": theme === "anemo",
              "bg-hydro/50": theme === "hydro",
              "bg-electro/50": theme === "electro",
              "bg-dendro/50": theme === "dendro",
              "bg-cryo/50": theme === "cryo",
              "bg-geo/50": theme === "geo"
            })}>
            <div className="flex flex-col items-center justify-center px-10">
              <strong className="text-2xl leading-none font-semibold">{user.name}</strong>
              <span className="text-base">{user.gameUid}</span>
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
                  className="px-3 h-8 rounded bg-black w-full focus:outline-none focus:ring-2 ring-pyro"
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
                  className="px-3 h-8 rounded bg-black w-full focus:outline-none focus:ring-2 ring-pyro"
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
                  className="px-3 h-8 rounded bg-black w-full focus:outline-none focus:ring-2 ring-pyro"
                  defaultValue={user.wishes.standard}
                />
              </div>
            </div>
          </div>
          <button
            className={clsx("mt-4 py-3 px-4 rounded font-semibold text-md transition-colors focus:ring-2", {
              "bg-pyro/50 hover:bg-pyro ring-pyro": theme === "pyro",
              "bg-anemo/50 hover:bg-anemo ring-anemo": theme === "anemo",
              "bg-hydro/50 hover:bg-hydro ring-hydro": theme === "hydro",
              "bg-electro/50 hover:bg-electro ring-electro": theme === "electro",
              "bg-dendro/50 hover:bg-dendro ring-dendro": theme === "dendro",
              "bg-cryo/50 hover:bg-cryo ring-cryo": theme === "cryo",
              "bg-geo/50 hover:bg-geo ring-geo": theme === "geo"
            })}
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
