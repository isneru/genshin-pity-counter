import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const editUserBody = z.object({
    name: z.string(),
    id: z.string(),
    gameUid: z.number(),
    wishes: z.object({
      standard: z.number(),
      event: z.number(),
      weapon: z.number()
    })
  })

  const { name, id, gameUid, wishes } = editUserBody.parse(req.body)
  try {
    const updatedUser = await prisma!.wishes.update({
      data: {
        standard: wishes.standard,
        event: wishes.event,
        weapon: wishes.weapon
      },
      where: {
        userUid: gameUid
      }
    })
    res.status(200).json({ message: "User Updated", success: true, data: updatedUser })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
