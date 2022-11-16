import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const createUserBody = z.object({
    name: z.string(),
    gameUid: z.number().int().gte(100000000).lte(999999999)
  })

  const { name, gameUid } = createUserBody.parse(req.body)

  try {
    const user = await prisma!.user.create({
      data: {
        name,
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

    res.status(200).json({ message: "User Created", success: true, data: user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error })
  }
}
