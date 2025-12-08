import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.ts'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prismaConnect = new PrismaClient({ adapter })

// Ensure connection is established
prismaConnect.$connect().catch((err) => {
  console.error("Failed to connect to database:", err)
  process.exit(1)
})

export { prismaConnect }