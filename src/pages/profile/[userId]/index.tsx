import clsx from "clsx"
import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useContext } from "react"
import { prisma } from "service"
import { ThemeContext } from "utils/ThemeProvider"

interface UserProfileProps {
  user: {
    id: string
    name: string
    gameUid: number
    wishes: {
      weapon: number
      event: number
      standard: number
    }
  }
}

const UserProfile: NextPage<UserProfileProps> = ({ user }: UserProfileProps) => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <NextHead title={`${user.name}'s Profile`} icon="/intertwined.svg" />
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-stretch max-w-[400px]">
          <div
            className={clsx("py-4 px-6 rounded flex gap-4", {
              "bg-pyro/50 hover:bg-pyro ring-pyro": theme === "pyro",
              "bg-anemo/50 hover:bg-anemo ring-anemo": theme === "anemo",
              "bg-hydro/50 hover:bg-hydro ring-hydro": theme === "hydro",
              "bg-electro/50 hover:bg-electro ring-electro": theme === "electro",
              "bg-dendro/50 hover:bg-dendro ring-dendro": theme === "dendro",
              "bg-cryo/50 hover:bg-cryo ring-cryo": theme === "cryo",
              "bg-geo/50 hover:bg-geo ring-geo": theme === "geo"
            })}>
            <div className="flex flex-col items-center justify-center px-10">
              <strong className="text-2xl leading-none font-semibold">{user.name}</strong>
              <span className="text-base">{user.gameUid}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span>Event Wishes</span>
                <span className="px-3 h-8 rounded bg-black w-full flex items-center">{user.wishes.event}</span>
              </div>
              <div className="flex flex-col">
                <span>Weapon Wishes</span>
                <span className="px-3 h-8 rounded bg-black w-full flex items-center">{user.wishes.weapon}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="standard">Standard Wishes</label>
                <span className="px-3 h-8 rounded bg-black w-full flex items-center">{user.wishes.standard}</span>
              </div>
            </div>
          </div>
          <Link
            href={`./${user.id}/edit`}
            className={clsx("mt-4 py-3 px-4 rounded font-semibold text-md transition-colors focus:ring-2 text-center", {
              "bg-pyro/50 hover:bg-pyro ring-pyro": theme === "pyro",
              "bg-anemo/50 hover:bg-anemo ring-anemo": theme === "anemo",
              "bg-hydro/50 hover:bg-hydro ring-hydro": theme === "hydro",
              "bg-electro/50 hover:bg-electro ring-electro": theme === "electro",
              "bg-dendro/50 hover:bg-dendro ring-dendro": theme === "dendro",
              "bg-cryo/50 hover:bg-cryo ring-cryo": theme === "cryo",
              "bg-geo/50 hover:bg-geo ring-geo": theme === "geo"
            })}
            type="submit">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  )
}

export default UserProfile

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
