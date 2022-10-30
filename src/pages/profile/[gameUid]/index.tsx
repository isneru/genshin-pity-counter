import { NextHead } from "components"
import type { GetServerSideProps, NextPage } from "next"
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
      <div className="pt-20">
        <p>id {user.id}</p>
        <p>name {user.name}</p>
        <p>gameUid {user.gameUid}</p>
        <p>event {user.wishes.event}</p>
        <p>standard {user.wishes.standard}</p>
        <p>weapon {user.wishes.weapon}</p>
      </div>
    </>
  )
}

export default UserProfile

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userGameUid = Number(params!.gameUid)
  const user = await prisma!.user.findUnique({
    select: {
      id: true,
      name: true,
      gameUid: true,
      wishes: true
    },
    where: { gameUid: userGameUid }
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
