import { prisma } from '@/lib/prisma'
import { PostWithTags } from '@/types'
import { cache } from 'react'

export const getAllPosts = cache(async (): Promise<PostWithTags[]> => {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    include: { tags: true },
  })
})

export const getFeaturedPosts = cache(async (limit = 6): Promise<PostWithTags[]> => {
  return prisma.post.findMany({
    where: { published: true, featured: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    include: { tags: true },
  })
})

export const getPostBySlug = cache(async (slug: string): Promise<PostWithTags | null> => {
  return prisma.post.findUnique({
    where: { slug },
    include: { tags: true },
  })
})

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  })
  return posts.map((p) => p.slug)
})

export const getPostsByTag = cache(async (tagSlug: string): Promise<PostWithTags[]> => {
  return prisma.post.findMany({
    where: {
      published: true,
      tags: { some: { slug: tagSlug } },
    },
    orderBy: { publishedAt: 'desc' },
    include: { tags: true },
  })
})

export const getRelatedPosts = cache(async (
  postId: string,
  tagSlugs: string[],
  limit = 3
): Promise<PostWithTags[]> => {
  if (tagSlugs.length === 0) return []

  return prisma.post.findMany({
    where: {
      published: true,
      id: { not: postId },
      tags: { some: { slug: { in: tagSlugs } } },
    },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    include: { tags: true },
  })
})

export const getPrevNextPosts = cache(async (publishedAt: Date | null) => {
  if (!publishedAt) return { prev: null, next: null }

  const [prev, next] = await Promise.all([
    prisma.post.findFirst({
      where: { published: true, publishedAt: { lt: publishedAt } },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true },
    }),
    prisma.post.findFirst({
      where: { published: true, publishedAt: { gt: publishedAt } },
      orderBy: { publishedAt: 'asc' },
      select: { slug: true, title: true },
    }),
  ])

  return { prev, next }
})

export const getAllTags = cache(async () => {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { posts: true } },
    },
  })
})