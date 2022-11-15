import clsx from "clsx"
import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useContext } from "react"
import { prisma } from "service"
import { ThemeContext } from "utils/ThemeProvider"

interface DataProps {
  users: {
    id: string
    name: string
    gameUid: number
  }[]
}

const Home: NextPage<DataProps> = ({ users }: DataProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <NextHead title="Home" icon="/acquainted.svg" />
      <div className="h-screen flex justify-center items-center">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <li
              key={user.id}
              className={clsx("px-4 py-3 rounded-sm flex flex-col gap-2", {
                "bg-pyro/50": theme === "pyro",
                "bg-anemo/50": theme === "anemo",
                "bg-hydro/50": theme === "hydro",
                "bg-electro/50": theme === "electro",
                "bg-dendro/50": theme === "dendro",
                "bg-cryo/50": theme === "cryo",
                "bg-geo/50": theme === "geo"
              })}>
              <div className="flex-1 text-center">
                <Link href={`/profile/${user.id}`}>
                  <span className="font-bold">{user.name}</span>
                </Link>
              </div>
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

export default Home

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
