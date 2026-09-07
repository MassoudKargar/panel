'use client'

import { cn } from '@/lib/utils'
import { Star, GitFork, Tag, Clock, Globe, Lock, ExternalLink, Github } from 'lucide-react'
import { Tag as TagComponent } from '@/components/ui/Tag'
import { Card } from '@/components/ui/Card'

export interface RepositoryCardProps {
  repository: {
    id: string
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
  variant?: 'default' | 'compact' | 'featured'
  showActions?: boolean
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    'C#': '#239120',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Python': '#3776AB',
    'Go': '#00ADD8',
    'Rust': '#DEA584',
    'Java': '#ED8B00',
    'C++': '#00599C',
    'C': '#A8B9CC',
    'PHP': '#777BB4',
    'Ruby': '#CC342D',
    'Swift': '#FA7343',
    'Kotlin': '#7F52FF',
    'Dart': '#0175C2',
    'HTML': '#E34F26',
    'CSS': '#1572B6',
    'Shell': '#89E051',
    'Dockerfile': '#2496ED',
    'Makefile': '#427819',
  }
  return colors[language] || '#6B7280'
}

export function RepositoryCard({ repository, variant = 'default', showActions = true }: RepositoryCardProps) {
  const isFeatured = repository.featured
  const displayDescription = repository.customDescription || repository.description
  const displayTechnologies = repository.customTechnologies.length > 0 
    ? repository.customTechnologies 
    : (repository.primaryLanguage ? [repository.primaryLanguage] : [])

  const stars = formatNumber(repository.stars)
  const forks = formatNumber(repository.forks)
  
  const updatedDate = new Date(repository.pushedAt || repository.updatedAt)
  const timeAgo = updatedDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })

  const primaryLanguageColor = repository.primaryLanguage 
    ? getLanguageColor(repository.primaryLanguage) 
    : '#6B7280'

  const cardClass = cn(
    'group relative overflow-hidden transition-all duration-300',
    'bg-card border border-border',
    'hover:border-primary/30 hover:shadow-lg',
    variant === 'featured' && 'ring-2 ring-primary/20',
    variant === 'compact' && 'p-4',
    variant === 'default' && 'p-6',
    variant === 'featured' && 'p-6'
  )

  return (
    <Card className={cardClass}>
      {isFeatured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Star className="h-3 w-3" fill="currentColor" />
            Featured
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
          <a href={repository.htmlUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            {repository.name}
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          </a>
        </h3>
        
        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
          <span className="px-2 py-0.5 rounded bg-muted">{repository.ownerLogin}</span>
          {repository.isFork && (
            <span className="px-2 py-0.5 rounded bg-muted text-xs">
              <GitFork className="h-3 w-3 inline mr-1" />
              Fork
            </span>
          )}
          {repository.isArchived && (
            <span className="px-2 py-0.5 rounded bg-muted text-xs">
              <Lock className="h-3 w-3 inline mr-1" />
              Archived
            </span>
          )}
        </div>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
        {displayDescription || 'No description provided'}
      </p>

      {repository.primaryLanguage && (
        <div className="flex items-center gap-2 mb-4">
          <span 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: primaryLanguageColor }}
            title={repository.primaryLanguage}
          />
          <span className="text-sm font-medium">{repository.primaryLanguage}</span>
          
          {repository.languages && Object.keys(repository.languages).length > 1 && (
            <span className="text-xs text-muted-foreground">
              +{Object.keys(repository.languages).length - 1} more
            </span>
          )}
        </div>
      )}

      {displayTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {displayTechnologies.slice(0, 6).map((tech) => (
            <TagComponent key={tech} variant="outline" size="sm">
              {tech}
            </TagComponent>
          ))}
          {displayTechnologies.length > 6 && (
            <TagComponent variant="outline" size="sm">
              +{displayTechnologies.length - 6}
            </TagComponent>
          )}
        </div>
      )}

      {repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repository.topics.slice(0, 5).map((topic) => (
            <TagComponent key={topic} variant="default" size="sm" className="text-xs">
              {topic}
            </TagComponent>
          ))}
          {repository.topics.length > 5 && (
            <TagComponent variant="default" size="sm" className="text-xs">
              +{repository.topics.length - 5}
            </TagComponent>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1" title={`Stars: ${repository.stars}`}>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {stars}
          </span>
          <span className="flex items-center gap-1" title={`Forks: ${repository.forks}`}>
            <GitFork className="h-4 w-4" />
            {forks}
          </span>
          <span className="flex items-center gap-1" title={`Last updated`}>
            <Clock className="h-4 w-4" />
            {timeAgo}
          </span>
        </div>

        {repository.category && (
          <TagComponent variant="outline" size="sm" className="text-xs">
            {repository.category}
          </TagComponent>
        )}
      </div>

      {showActions && (
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          
          {repository.homepageUrl && (
            <a
              href={repository.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
            >
              <Globe className="h-4 w-4" />
              Demo
            </a>
          )}
        </div>
      )}
    </Card>
  )
}