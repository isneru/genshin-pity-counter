import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, gameUid } = req.body

  try {
    await prisma.user.create({
      data: {
        name,
        gameUid
      }
    })
    res.status(200).json({ message: "User Created" })
  } catch (error) {
    console.log(error)
  }
}
