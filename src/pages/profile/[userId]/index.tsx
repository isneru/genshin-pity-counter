import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { prisma } from "service"

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
  return (
    <>
      <NextHead title={`${user.name}'s Profile`} icon="/intertwined.svg" />
      <div className="h-screen w-full flex justify-center items-center -mt-20">
        <div className="flex flex-col justify-center items-stretch max-w-[400px]">
          <div className="bg-slate-900 py-4 px-6 rounded flex gap-4">
            <div className="flex flex-col items-center justify-center px-10">
              <strong className="text-2xl leading-none font-semibold">{user.name}</strong>
              <span className="text-base text-zinc-400">{user.gameUid}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span>Event Wishes</span>
                <span className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300 flex items-center">
                  {user.wishes.event}
                </span>
              </div>
              <div className="flex flex-col">
                <span>Weapon Wishes</span>
                <span className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300  flex items-center">
                  {user.wishes.weapon}
                </span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="standard">Standard Wishes</label>
                <span className="px-3 h-8 rounded bg-mainblue w-full focus:outline-none focus:ring-2 ring-pink-300  flex items-center">
                  {user.wishes.standard}
                </span>
              </div>
            </div>
          </div>
          <Link
            href={`./${user.id}/edit`}
            className="mt-4 py-3 px-4 bg-slate-900 rounded font-semibold text-md transition-colors hover:bg-slate-800 focus:ring-2 ring-white text-center"
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
