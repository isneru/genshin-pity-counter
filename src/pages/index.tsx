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
        <ul className="flex items-center justify-center flex-wrap gap-4 max-w-[90vw]">
          {users.map(user => (
            <li
              key={user.id}
              className={clsx(
                "w-40 h-20 flex flex-col items-center justify-center rounded transition-colors",
                `bg-${theme}/50 hover:bg-${theme}`
              )}>
              <Link
                className="px-4 py-3 flex flex-1 flex-col items-center justify-center"
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
