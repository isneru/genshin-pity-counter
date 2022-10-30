import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gameUid, weapon, event, standard } = req.body

  try {
    const updatedUser = await prisma!.user.update({
      data: {
        wishes: {
          update: {
            weapon,
            event,
            standard
          }
        }
      },
      where: { gameUid }
    })
    res.status(200).json({ message: "User Updated", success: true, data: updatedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error })
  }
}
