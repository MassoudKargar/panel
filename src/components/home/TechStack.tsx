import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Code2, Server, Database, Network, Brain, Zap, Layers, Terminal } from 'lucide-react'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Backend: Code2,
  Architecture: Server,
  Data: Database,
  Messaging: Network,
  Infrastructure: Layers,
  AI: Brain,
}

const aiCategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  LLMs: Brain,
  'AI Agents': Zap,
  MCP: Network,
  RAG: Layers,
  'AI Engineering': Zap,
  'Vector Databases': Database,
}

const exploringIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'AI Agents': Brain,
  LLM: Zap,
  MCP: Network,
  RAG: Layers,
  Distributed: Network,
  'High-performance': Zap,
  Backend: Terminal,
}

type SkillCategory = keyof typeof siteConfig.skills

export function TechStack() {
  const coreCategories: SkillCategory[] = ['Backend', 'Architecture', 'Data', 'Messaging', 'Infrastructure']
  const coreEngineering = coreCategories.filter(c => siteConfig.skills[c])
  const aiEngineering = Object.entries(siteConfig.skills).filter(([cat]) => 
    ['AI', 'LLMs', 'AI Agents', 'MCP', 'RAG', 'AI Engineering', 'Vector Databases'].includes(cat)
  )

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technology Stack</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with daily, organized by domain. Not a buzzword list&mdash;tools I&apos;ve used in production.
          </p>
        </header>

        <div className="space-y-16">
          {/* Core Engineering */}
          <div>
            <header className="mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Code2 className="h-7 w-7 text-primary" />
                Core Engineering
              </h3>
              <p className="text-muted-foreground mt-2">Backend, architecture, data, and infrastructure</p>
            </header>

            <div className="space-y-8">
              {coreEngineering.map((category) => {
                const technologies = siteConfig.skills[category]
                const Icon = categoryIcons[category] || Code2
                return (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h4 className="text-xl font-semibold">{category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium rounded-full bg-card border border-border text-foreground hover:bg-accent transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Engineering */}
          <div className="border-t border-border pt-16">
            <header className="mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="h-7 w-7 text-primary" />
                AI Engineering
              </h3>
              <p className="text-muted-foreground mt-2">Technologies and concepts I am actively working with</p>
            </header>

            <div className="space-y-8">
              {Object.entries(siteConfig.skills).filter(([cat]) => 
                ['AI', 'LLMs', 'AI Agents', 'MCP', 'RAG', 'AI Engineering', 'Vector Databases'].includes(cat)
              ).map(([category, technologies]) => {
                const Icon = aiCategoryIcons[category] || Brain
                return (
                  <div key={category} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      <h4 className="text-xl font-semibold">{category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Currently Exploring */}
          <div className="border-t border-border pt-16">
            <header className="mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="h-7 w-7 text-primary" />
                Currently Exploring
              </h3>
              <p className="text-muted-foreground mt-2">Technologies I&apos;m currently learning or experimenting with</p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.currentlyExploring.map((topic) => {
                const firstWord = topic.split(' ')[0]
                const Icon = exploringIcons[firstWord] || Zap
                return (
                  <div
                    key={topic}
                    className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {topic}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Actively researching and experimenting
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}