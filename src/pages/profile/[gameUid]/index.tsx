import clsx from "clsx"
import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { prisma } from "service"
import { ThemeContext } from "utils/providers"

interface UserProfileProps {
  user: {
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
}

const UserProfile: NextPage<UserProfileProps> = ({ user }: UserProfileProps) => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <NextHead title={`${user.name}'s Profile`} icon="/intertwined.svg" />
      <div className="flex h-screen items-center justify-center">
        <div className="flex max-w-[400px] flex-col items-stretch justify-center">
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
              <Image
                className={clsx("rounded-full ring-2", {
                  "ring-pyro": theme === "pyro",
                  "ring-anemo": theme === "anemo",
                  "ring-hydro": theme === "hydro",
                  "ring-electro": theme === "electro",
                  "ring-dendro": theme === "dendro",
                  "ring-cryo": theme === "cryo",
                  "ring-geo": theme === "geo"
                })}
                src={`/genshin-characters/${user.avatar}.png`}
                width={100}
                height={100}
                alt="Genshin Character as profile picture"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span>Event Wishes</span>
                <span className="flex h-8 w-full items-center rounded bg-black px-3">{user.wishes.event}</span>
              </div>
              <div className="flex flex-col">
                <span>Weapon Wishes</span>
                <span className="flex h-8 w-full items-center rounded bg-black px-3">{user.wishes.weapon}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="standard">Standard Wishes</label>
                <span className="flex h-8 w-full items-center rounded bg-black px-3">{user.wishes.standard}</span>
              </div>
            </div>
          </div>
          <Link
            href={`./${user.gameUid}/edit`}
            className={clsx("text-md mt-4 rounded py-3 px-4 text-center font-semibold transition-colors focus:ring-2", {
              "bg-pyro/50 ring-pyro hover:bg-pyro": theme === "pyro",
              "bg-anemo/50 ring-anemo hover:bg-anemo": theme === "anemo",
              "bg-hydro/50 ring-hydro hover:bg-hydro": theme === "hydro",
              "bg-electro/50 ring-electro hover:bg-electro": theme === "electro",
              "bg-dendro/50 ring-dendro hover:bg-dendro": theme === "dendro",
              "bg-cryo/50 ring-cryo hover:bg-cryo": theme === "cryo",
              "bg-geo/50 ring-geo hover:bg-geo": theme === "geo"
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
  const userUid = String(params!.gameUid)
  const user = await prisma!.user.findUnique({
    select: {
      avatar: true,
      id: true,
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
