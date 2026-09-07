import { getFeaturedRepositories } from '@/lib/repositories'
import { RepositoryGrid } from '@/components/projects/RepositoryGrid'
import type { Repository } from '@/components/projects/RepositoryGrid'

export async function FeaturedProjects() {
  const projects = await getFeaturedRepositories(6)

  if (projects.length === 0) return null

  // Cast to Repository type for RepositoryGrid
  const repositories = projects as Repository[]

  return (
    <section id="featured-projects" className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Projects selected for personal branding—representing my best work across backend, AI, and infrastructure.
          </p>
        </header>

        <RepositoryGrid repositories={repositories} variant="featured" />
        
        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            View All Projects
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}