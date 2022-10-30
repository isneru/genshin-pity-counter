import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "service/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const updatedUser = await prisma!.wishes.update({
      data: {
        standard: req.body.wishes.standard,
        event: req.body.wishes.event,
        weapon: req.body.wishes.weapon
      },
      where: {
        userId: req.body.id
      }
    })
    res.status(200).json({ message: "User Updated", success: true, data: updatedUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error })
  }
}
