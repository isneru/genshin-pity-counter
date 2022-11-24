import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const loginUserBody = z.object({
    name: z.string(),
    password: z.string()
  })

  const { name, password } = loginUserBody.parse(req.body)

  try {
    const user = await prisma!.user.findFirst({
      where: {
        name
      }
    })
    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {
        res.status(200).json({
          message: "Logged in",
          success: true,
          data: { avatar: user.avatar, gameUid: user.gameUid, id: user.id, name: user.name }
        })
      }
      throw new Error("incorrect password")
    }
    throw new Error("incorrect username")
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}
