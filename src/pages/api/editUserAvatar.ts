import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const editUserAvatarBody = z.object({
    gameUid: z.number(),
    avatar: z.string()
  })

  const { gameUid, avatar } = editUserAvatarBody.parse(req.body)
  try {
    const updatedUser = await prisma!.user.update({
      data: {
        avatar
      },
      where: {
        gameUid
      }
    })
    return res.status(200).json({ message: "User Updated", success: true, data: updatedUser })
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
}
