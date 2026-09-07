import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  const repos = await prisma.repository.findMany({
    where: { slug: { equals: '' } },
  })
  
  for (const repo of repos) {
    const slug = generateSlug(repo.name)
    await prisma.repository.update({
      where: { id: repo.id },
      data: { slug },
    })
    console.log(`Updated ${repo.name} -> ${slug}`)
  }
  
  console.log('Done!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
