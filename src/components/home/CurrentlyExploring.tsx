import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Sparkles, Zap, Brain, Network, Cpu, Database, Server } from 'lucide-react'

const topicIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'AI Agents': Brain,
  'LLM': Zap,
  'MCP': Network,
  'RAG': Sparkles,
  'Distributed': Network,
  'High-performance': Cpu,
  'Backend': Server,
}

export function CurrentlyExploring() {
  return (
    <section id="exploring" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Currently Exploring</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Topics I&apos;m actively learning, building with, or diving deeper into.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.currentlyExploring.map((topic) => {
            const Icon = topicIcons[topic.split(' ')[0]] || Sparkles
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
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {topic}
                    </h3>
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
    </section>
  )
}