import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export const getAllProjects = cache(async () => {
  return prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
})

export const getFeaturedProjects = cache(async (limit = 6) => {
  return prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
})

export const getProjectBySlug = cache(async (slug: string) => {
  return prisma.project.findUnique({
    where: { slug },
  })
})

export const getAllProjectSlugs = cache(async (): Promise<string[]> => {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  })
  return projects.map((p) => p.slug)
})