import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient | null = null

if (typeof window === "undefined") {
  prisma = new PrismaClient()
}

export { prisma }
