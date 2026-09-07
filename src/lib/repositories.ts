import { prisma } from '@/lib/prisma'
import { unstable_cache as cache } from 'next/cache'

export interface RepositoryFilters {
  search?: string
  language?: string
  topic?: string
  category?: string
  featured?: boolean
  archived?: boolean
  fork?: boolean
  sort?: 'updatedAt' | 'createdAt' | 'pushedAt' | 'stars' | 'forks' | 'name'
  order?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface RepositoryWithStats {
  id: string
  slug: string
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  homepageUrl: string | null
  primaryLanguage: string | null
  languages: Record<string, number> | null
  topics: string[]
  stars: number
  forks: number
  openIssues: number
  license: string | null
  createdAt: Date
  updatedAt: Date
  pushedAt: Date | null
  defaultBranch: string | null
  isArchived: boolean
  isFork: boolean
  visibility: string
  ownerLogin: string
  readmeContent: string | null
  featured: boolean
  priority: number
  category: string | null
  customDescription: string | null
  customTechnologies: string[]
  whyIBuiltIt: string | null
  architecture: string | null
  challenges: string | null
  whatILearned: string | null
  lastSyncedAt: Date
  syncedAt: Date
}

function toRepositoryWithStats(repo: any): RepositoryWithStats {
  return {
    ...repo,
    languages: repo.languages as Record<string, number> | null,
    topics: repo.topics as string[],
    customTechnologies: repo.customTechnologies as string[],
    createdAt: new Date(repo.createdAt),
    updatedAt: new Date(repo.updatedAt),
    pushedAt: repo.pushedAt ? new Date(repo.pushedAt) : null,
    lastSyncedAt: new Date(repo.lastSyncedAt),
    syncedAt: new Date(repo.syncedAt),
  }
}

export const getAllRepositories = cache(
  async (filters: RepositoryFilters = {}): Promise<PaginatedResult<RepositoryWithStats>> => {
    const {
      search,
      language,
      topic,
      category,
      featured,
      archived = false,
      fork,
      sort = 'updatedAt',
      order = 'desc',
      page = 1,
      pageSize = 24,
    } = filters

    const where: any = {
      ownerLogin: 'MassoudKargar',
      isArchived: archived,
    }

    if (featured !== undefined) {
      where.featured = featured
    }

    if (fork !== undefined) {
      where.isFork = fork
    }

    if (language) {
      where.primaryLanguage = language
    }

    if (topic) {
      where.topics = { has: topic }
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
        { customDescription: { contains: search, mode: 'insensitive' } },
        { topics: { has: search } },
      ]
    }

    const orderBy: any = {}
    orderBy[sort] = order

    const [repos, total] = await Promise.all([
      prisma.repository.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.repository.count({ where }),
    ])

    return {
      data: repos.map(toRepositoryWithStats),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  },
  ['repositories'],
  { revalidate: 3600, tags: ['repositories'] }
)

export const getRepositoryBySlug = cache(
  async (slug: string): Promise<RepositoryWithStats | null> => {
    const repo = await prisma.repository.findUnique({
      where: { slug },
    })

    if (!repo) return null
    return toRepositoryWithStats(repo)
  },
  ['repository-detail'],
  { revalidate: 3600, tags: ['repository'] }
)

export const getFeaturedRepositories = cache(
  async (limit: number = 6): Promise<RepositoryWithStats[]> => {
    const repos = await prisma.repository.findMany({
      where: {
        ownerLogin: 'MassoudKargar',
        featured: true,
        isArchived: false,
      },
      orderBy: [
        { priority: 'desc' },
        { stars: 'desc' },
        { updatedAt: 'desc' },
      ],
      take: limit,
    })

    return repos.map(toRepositoryWithStats)
  },
  ['featured-repositories'],
  { revalidate: 3600, tags: ['repositories', 'featured'] }
)

export const getAllLanguages = cache(
  async (): Promise<string[]> => {
    const repos = await prisma.repository.findMany({
      where: { ownerLogin: 'MassoudKargar', isArchived: false },
      select: { primaryLanguage: true },
      distinct: ['primaryLanguage'],
    })
    return repos.map(r => r.primaryLanguage).filter(Boolean) as string[]
  },
  ['languages'],
  { revalidate: 3600, tags: ['repositories'] }
)

export const getAllTopics = cache(
  async (): Promise<string[]> => {
    const repos = await prisma.repository.findMany({
      where: { ownerLogin: 'MassoudKargar', isArchived: false },
      select: { topics: true },
    })
    const allTopics = repos.flatMap(r => r.topics)
    return Array.from(new Set(allTopics)).sort()
  },
  ['topics'],
  { revalidate: 3600, tags: ['repositories'] }
)

export const getAllCategories = cache(
  async (): Promise<string[]> => {
    const repos = await prisma.repository.findMany({
      where: { ownerLogin: 'MassoudKargar', isArchived: false },
      select: { category: true },
      distinct: ['category'],
    })
    return repos.map(r => r.category).filter(Boolean) as string[]
  },
  ['categories'],
  { revalidate: 3600, tags: ['repositories'] }
)

export const getGitHubUser = cache(
  async () => {
    const user = await prisma.gitHubUser.findFirst({
      where: { login: 'MassoudKargar' },
    })
    return user
  },
  ['github-user'],
  { revalidate: 3600, tags: ['github-user'] }
)

export const getRepositoryStats = cache(
  async () => {
    const [totalRepos, totalStars, totalForks, languages, featuredCount] = await Promise.all([
      prisma.repository.count({ where: { ownerLogin: 'MassoudKargar', isArchived: false, isFork: false } }),
      prisma.repository.aggregate({
        where: { ownerLogin: 'MassoudKargar', isArchived: false, isFork: false },
        _sum: { stars: true },
      }),
      prisma.repository.aggregate({
        where: { ownerLogin: 'MassoudKargar', isArchived: false, isFork: false },
        _sum: { forks: true },
      }),
      getAllLanguages(),
      prisma.repository.count({ where: { ownerLogin: 'MassoudKargar', featured: true, isArchived: false } }),
    ])

    return {
      totalRepos,
      totalStars: totalStars._sum.stars || 0,
      totalForks: totalForks._sum.forks || 0,
      languagesCount: languages.length,
      featuredCount,
    }
  },
  ['repository-stats'],
  { revalidate: 3600, tags: ['repositories', 'stats'] }
)