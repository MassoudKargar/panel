import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const repos = await prisma.repository.findMany({ select: { name: true, slug: true } })
  console.log('Count:', repos.length)
  console.log(repos)
  await prisma.$disconnect()
}

main().catch(console.error)
