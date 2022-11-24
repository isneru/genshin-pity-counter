import clsx from "clsx"
import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useContext } from "react"
import { prisma } from "service"
import { ThemeContext } from "utils/providers"

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
        <ul className="flex justify-center items-center flex-wrap gap-4 max-w-[80vw]">
          {users.map(user => (
            <li
              key={user.id}
              className={clsx("flex flex-col w-[200px] h-20 justify-center items-center rounded transition-colors", {
                "bg-pyro/50 hover:bg-pyro": theme === "pyro",
                "bg-anemo/50 hover:bg-anemo": theme === "anemo",
                "bg-hydro/50 hover:bg-hydro": theme === "hydro",
                "bg-electro/50 hover:bg-electro": theme === "electro",
                "bg-dendro/50 hover:bg-dendro": theme === "dendro",
                "bg-cryo/50 hover:bg-cryo": theme === "cryo",
                "bg-geo/50 hover:bg-geo": theme === "geo"
              })}>
              <Link
                className="flex flex-col justify-center items-center px-4 py-3 flex-1"
                href={`/profile/${user.gameUid}`}>
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
      avatar: true,
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
