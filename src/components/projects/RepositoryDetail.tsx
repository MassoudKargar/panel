'use client'

import { cn } from '@/lib/utils'
import { Star, GitFork, Tag, Clock, Globe, Lock, ExternalLink, Github, Calendar, Code2, BookOpen, AlertTriangle, Lightbulb, ArrowLeft } from 'lucide-react'
import { Tag as TagComponent } from '@/components/ui/Tag'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { Repository } from '@/components/projects/RepositoryGrid'

interface RepositoryDetailProps {
  repository: Repository
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

export function RepositoryDetail({ repository }: RepositoryDetailProps) {
  const isFeatured = repository.featured
  const displayDescription = repository.customDescription || repository.description
  const displayTechnologies = repository.customTechnologies.length > 0 
    ? repository.customTechnologies 
    : (repository.primaryLanguage ? [repository.primaryLanguage] : [])

  const stars = formatNumber(repository.stars)
  const forks = formatNumber(repository.forks)
  
  const createdDate = new Date(repository.createdAt)
  const updatedDate = new Date(repository.pushedAt || repository.updatedAt)
  const createdStr = createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const updatedStr = updatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const primaryLanguageColor = repository.primaryLanguage 
    ? getLanguageColor(repository.primaryLanguage) 
    : '#6B7280'

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {isFeatured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Star className="h-4 w-4" fill="currentColor" />
              Featured
            </span>
          )}
          {repository.isFork && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
              <GitFork className="h-4 w-4" />
              Fork
            </span>
          )}
          {repository.isArchived && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
              <Lock className="h-4 w-4" />
              Archived
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {repository.name}
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {displayDescription || 'No description provided'}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1" title={`Stars: ${repository.stars}`}>
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <strong>{stars}</strong>
            </span>
            <span className="flex items-center gap-1" title={`Forks: ${repository.forks}`}>
              <GitFork className="h-5 w-5" />
              <strong>{forks}</strong>
            </span>
            <span className="flex items-center gap-1" title={`Issues: ${repository.openIssues}`}>
              <AlertTriangle className="h-5 w-5" />
              <strong>{formatNumber(repository.openIssues)}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={repository.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            
            {repository.homepageUrl && (
              <a
                href={repository.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                <Globe className="h-4 w-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              {repository.whyIBuiltIt ? (
                <>
                  <h3>Why I Built It</h3>
                  <p>{repository.whyIBuiltIt}</p>
                </>
              ) : (
                <p>{displayDescription || 'No description provided.'}</p>
              )}
              
              {repository.architecture && (
                <>
                  <h3>Architecture</h3>
                  <p>{repository.architecture}</p>
                </>
              )}
              
              {repository.challenges && (
                <>
                  <h3>Challenges</h3>
                  <p>{repository.challenges}</p>
                </>
              )}
              
              {repository.whatILearned && (
                <>
                  <h3>What I Learned</h3>
                  <p>{repository.whatILearned}</p>
                </>
              )}
            </div>
          </section>

          {/* Technical Details */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {repository.primaryLanguage && (
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${primaryLanguageColor}20`, color: primaryLanguageColor }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryLanguageColor }} />
                      {repository.primaryLanguage}
                    </span>
                  )}
                  {displayTechnologies.filter(t => t !== repository.primaryLanguage).map((tech) => (
                    <TagComponent key={tech} variant="outline" size="sm">
                      {tech}
                    </TagComponent>
                  ))}
                  {repository.languages && Object.keys(repository.languages).length > 1 && (
                    <TagComponent variant="outline" size="sm">
                      +{Object.keys(repository.languages).length - 1} more
                    </TagComponent>
                  )}
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {repository.topics.length > 0 ? (
                    repository.topics.map((topic) => (
                      <TagComponent key={topic} variant="default" size="sm">
                        {topic}
                      </TagComponent>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No topics</span>
                  )}
                </div>
              </Card>

              {repository.category && (
                <Card>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Category
                  </h3>
                  <TagComponent variant="outline">
                    {repository.category}
                  </TagComponent>
                </Card>
              )}

              <Card>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  License
                </h3>
                <p className="text-muted-foreground">
                  {repository.license || 'No license specified'}
                </p>
              </Card>
            </div>
          </section>

          {/* Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GitHub Repository</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-xs">{repository.htmlUrl}</p>
                  </div>
                </div>
              </Card>

              {repository.homepageUrl && (
                <Card className="p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Demo</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{repository.homepageUrl}</p>
                    </div>
                  </div>
                </Card>
              )}

              {repository.readmeContent && (
                <Card className="p-4 hover:border-primary/50 transition-colors sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">README</h3>
                      <p className="text-sm text-muted-foreground">Documentation and usage instructions</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </section>

          {/* Stats */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Repository Stats</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{stars}</div>
                <div className="text-sm text-muted-foreground">Stars</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{forks}</div>
                <div className="text-sm text-muted-foreground">Forks</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{formatNumber(repository.openIssues)}</div>
                <div className="text-sm text-muted-foreground">Open Issues</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{Object.keys(repository.languages || {}).length}</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="font-medium">{createdStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Last Pushed</dt>
                  <dd className="font-medium">{updatedStr}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Default Branch</dt>
                  <dd className="font-medium font-mono">{repository.defaultBranch || 'main'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Owner</dt>
                  <dd className="font-medium">{repository.ownerLogin}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Visibility</dt>
                  <dd className="font-medium capitalize">{repository.visibility}</dd>
                </div>
              </dl>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <a
                  href={repository.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </div>
                </a>
                
                {repository.homepageUrl && (
                  <a
                    href={repository.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      View Live Demo
                    </div>
                  </a>
                )}
              </div>
            </Card>

            {repository.customTechnologies.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Custom Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {repository.customTechnologies.map((tech) => (
                    <TagComponent key={tech} variant="outline" size="sm">
                      {tech}
                    </TagComponent>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}