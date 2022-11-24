import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const createUserBody = z.object({
    name: z.string(),
    gameUid: z.number().int().gte(100000000).lte(999999999),
    password: z.string()
  })

  const { name, gameUid, password } = createUserBody.parse(req.body)
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await prisma!.user.create({
      data: {
        name,
        password: hashedPassword,
        gameUid,
        wishes: {
          create: {
            weapon: 0,
            event: 0,
            standard: 0
          }
        }
      }
    })

    return res.status(200).json({ message: "User Created", success: true, data: user })
  } catch (error) {
    return res.status(500).json({ success: false, error })
  }
}
