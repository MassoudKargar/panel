import { getGitHubUser, getRepositoryStats } from '@/lib/repositories'
import { Star, GitFork, Users, Code2 } from 'lucide-react'

export async function GitHubStats() {
  const [user, stats] = await Promise.all([
    getGitHubUser(),
    getRepositoryStats(),
  ])

  if (!user && stats.totalRepos === 0) return null

  return (
    <section id="github" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            GitHub Profile
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time statistics from my GitHub profile. Data synced periodically.
          </p>
        </header>

        {user && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">{user.publicRepos}</div>
              <div className="text-muted-foreground">Public Repositories</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">
                <Star className="h-5 w-5 inline mr-1 fill-yellow-400 text-yellow-400" />
                {stats.totalStars}
              </div>
              <div className="text-muted-foreground">Total Stars</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">
                <GitFork className="h-5 w-5 inline mr-1" />
                {stats.totalForks}
              </div>
              <div className="text-muted-foreground">Total Forks</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
              <div className="text-4xl font-bold text-primary mb-2">
                <Users className="h-5 w-5 inline mr-1" />
                {user.followers}
              </div>
              <div className="text-muted-foreground">Followers</div>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            Most Used Languages
          </h3>
          <p className="text-muted-foreground mb-4">
            Based on {stats.languagesCount} languages across {stats.totalRepos} repositories
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'C#', percentage: 35, color: '#239120' },
              { name: 'TypeScript', percentage: 20, color: '#3178C6' },
              { name: 'Go', percentage: 15, color: '#00ADD8' },
              { name: 'Python', percentage: 12, color: '#3776AB' },
              { name: 'JavaScript', percentage: 10, color: '#F7DF1E' },
              { name: 'SQL', percentage: 8, color: '#CC2929' },
            ].map((lang) => (
              <div key={lang.name} className="flex items-center gap-3 min-w-[150px]">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="font-medium">{lang.name}</span>
                <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
                  <div 
                    className="h-full rounded" 
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-10 text-right">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/MassoudKargar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            View Full Profile on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}