import clsx from "clsx"
import { AvatarSwitcher, NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { api, prisma } from "service"
import { SessionContext, ThemeContext } from "utils/providers"

interface UserProfileProps {
  user: UserDataProps
}

interface UserDataProps {
  avatar: string
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
  const { session } = useContext(SessionContext)
  const [userData, setUserData] = useState<UserDataProps>(user)
  const router = useRouter()

  if (user.name !== session?.user.name) {
    router.push("/")
  }

  async function createUser(data: UserDataProps) {
    try {
      api
        .post("/editUser", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => router.push(`/profile/${user.gameUid}`))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <NextHead title="Edit Profile" icon="/intertwined.svg" />
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={e => {
            e.preventDefault()
            createUser(userData)
          }}
          className="flex max-w-[600px] flex-col items-stretch justify-center">
          <div
            className={clsx("flex gap-4 rounded py-4 px-6", {
              "bg-pyro/50": theme === "pyro",
              "bg-anemo/50": theme === "anemo",
              "bg-hydro/50": theme === "hydro",
              "bg-electro/50": theme === "electro",
              "bg-dendro/50": theme === "dendro",
              "bg-cryo/50": theme === "cryo",
              "bg-geo/50": theme === "geo"
            })}>
            <div className="flex flex-col items-center justify-center px-10">
              <strong className="text-2xl font-semibold leading-none">{user.name}</strong>
              <span className="text-base">{user.gameUid}</span>
              <AvatarSwitcher user={user} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="event">Event Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: {
                        ...userData.wishes,
                        [e.currentTarget.name]: e.currentTarget.valueAsNumber
                      }
                    })
                  }
                  type="number"
                  id="event"
                  name="event"
                  min={0}
                  max={90}
                  className={clsx("h-8 w-full rounded bg-black px-3 focus:outline-none focus:ring-2", {
                    "ring-pyro": theme === "pyro",
                    "ring-anemo": theme === "anemo",
                    "ring-hydro": theme === "hydro",
                    "ring-electro": theme === "electro",
                    "ring-dendro": theme === "dendro",
                    "ring-cryo": theme === "cryo",
                    "ring-geo": theme === "geo"
                  })}
                  defaultValue={user.wishes.event}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="weapon">Weapon Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: {
                        ...userData.wishes,
                        [e.currentTarget.name]: e.currentTarget.valueAsNumber
                      }
                    })
                  }
                  type="number"
                  id="weapon"
                  name="weapon"
                  min={0}
                  max={80}
                  className={clsx("h-8 w-full rounded bg-black px-3 focus:outline-none focus:ring-2", {
                    "ring-pyro": theme === "pyro",
                    "ring-anemo": theme === "anemo",
                    "ring-hydro": theme === "hydro",
                    "ring-electro": theme === "electro",
                    "ring-dendro": theme === "dendro",
                    "ring-cryo": theme === "cryo",
                    "ring-geo": theme === "geo"
                  })}
                  defaultValue={user.wishes.weapon}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="standard">Standard Wishes</label>
                <input
                  onChange={e =>
                    setUserData({
                      ...userData,
                      wishes: {
                        ...userData.wishes,
                        [e.currentTarget.name]: e.currentTarget.valueAsNumber
                      }
                    })
                  }
                  type="number"
                  id="standard"
                  name="standard"
                  min={0}
                  max={90}
                  className={clsx("h-8 w-full rounded bg-black px-3 focus:outline-none focus:ring-2", {
                    "ring-pyro": theme === "pyro",
                    "ring-anemo": theme === "anemo",
                    "ring-hydro": theme === "hydro",
                    "ring-electro": theme === "electro",
                    "ring-dendro": theme === "dendro",
                    "ring-cryo": theme === "cryo",
                    "ring-geo": theme === "geo"
                  })}
                  defaultValue={user.wishes.standard}
                />
              </div>
            </div>
          </div>
          <button
            className={clsx("text-md mt-4 rounded py-3 px-4 font-semibold transition-colors focus:ring-2", {
              "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
              "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
              "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
              "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
              "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
              "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
              "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
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
  const userUid = String(params!.gameUid)
  const user = await prisma!.user.findUnique({
    select: {
      id: true,
      avatar: true,
      name: true,
      gameUid: true,
      wishes: true
    },
    where: { gameUid: Number(userUid) }
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
