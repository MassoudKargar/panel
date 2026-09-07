'use client'

import { RepositoryCard } from './RepositoryCard'

export interface Repository {
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
  createdAt: Date | string
  updatedAt: Date | string
  pushedAt: Date | string | null
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
  lastSyncedAt: Date | string
  syncedAt: Date | string
}

interface RepositoryGridProps {
  repositories: Repository[]
  variant?: 'default' | 'compact' | 'featured'
  emptyMessage?: string
}

export function RepositoryGrid({ repositories, variant = 'default', emptyMessage = 'No repositories found' }: RepositoryGridProps) {
  if (repositories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    )
  }

  const columns = variant === 'compact' 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : variant === 'featured'
    ? 'grid-cols-1 lg:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid gap-6 ${columns}`} role="list" aria-label="Repositories">
      {repositories.map((repo) => (
        <RepositoryCard 
          key={repo.id} 
          repository={repo} 
          variant={variant}
        />
      ))}
    </div>
  )
}