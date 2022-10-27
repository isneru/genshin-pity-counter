import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, gameUid } = req.body

  try {
    const user = await prisma!.user.create({
      data: {
        name,
        gameUid
      }
    })

    const updatedUser = await prisma!.user.update({
      data: {
        wishes: {
          create: {
            weapon: 0,
            event: 0,
            standard: 0
          }
        }
      },
      where: { id: user.id }
    })
    res.status(200).json({ message: "User Created" })
    return updatedUser
  } catch (error) {
    console.log(error)
  }
}
