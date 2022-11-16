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
              className={clsx("rounded transition-colors", {
                "bg-pyro/50 hover:bg-pyro": theme === "pyro",
                "bg-anemo/50 hover:bg-anemo": theme === "anemo",
                "bg-hydro/50 hover:bg-hydro": theme === "hydro",
                "bg-electro/50 hover:bg-electro": theme === "electro",
                "bg-dendro/50 hover:bg-dendro": theme === "dendro",
                "bg-cryo/50 hover:bg-cryo": theme === "cryo",
                "bg-geo/50 hover:bg-geo": theme === "geo"
              })}>
              <Link className="px-4 py-3 flex flex-1 flex-col text-center" href={`/profile/${user.gameUid}`}>
                <span className="font-bold">{user.name ? user.name : "No Name"}</span>
                <span>{user.gameUid}</span>
              </Link>
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
