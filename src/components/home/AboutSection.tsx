import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { 
  Code2, Server, Database, Network, Brain, Zap, Users, BookOpen, 
  GraduationCap, Award, Heart, Terminal, Cloud, Layers, GitBranch, 
  Cpu, Shield, Lightbulb, Sparkles 
} from 'lucide-react'

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">About Me</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Software Engineer with 8+ years building scalable backend systems, distributed architectures, and AI-powered applications.
          </p>
        </header>

        <div className="space-y-16">
          {/* Who I Am & What I Do */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Who I Am
              </h3>
              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                <p>{siteConfig.about.who}</p>
                <p>{siteConfig.about.what}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Current Focus
              </h3>
              <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                <p>{siteConfig.about.now}</p>
              </div>
            </div>
          </div>

          {/* Engineering Philosophy */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
              Engineering Philosophy
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'Pragmatic Over Perfect', desc: 'Ship working solutions, iterate based on real feedback. Perfection is the enemy of done.' },
                { title: 'Observability First', desc: 'You can\'t improve what you can\'t measure. Logs, metrics, traces are not optional.' },
                { title: 'Boring Technology', desc: 'Choose proven tools. Save innovation tokens for where they create real competitive advantage.' },
                { title: 'Domain-Driven Design', desc: 'Model the business domain accurately. Code should speak the language of the problem.' },
                { title: 'Automation Mindset', desc: 'If you do it twice, automate it. CI/CD, testing, infrastructure as code.' },
                { title: 'Continuous Learning', desc: 'Tech evolves fast. Dedicate time weekly to explore, experiment, and understand new paradigms.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What I Build */}
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Code2 className="h-6 w-6 text-primary" />
              What I Build
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Server, title: 'High-Throughput Backends', desc: 'REST APIs, gRPC services handling millions of requests/day with sub-100ms latency' },
                { icon: GitBranch, title: 'Microservices & DDD', desc: 'Domain-driven microservice architectures with clean boundaries and event-driven communication' },
                { icon: Cloud, title: 'Cloud-Native Systems', desc: 'Kubernetes deployments, service mesh, observability stacks, infrastructure as code' },
                { icon: Database, title: 'Data-Intensive Applications', desc: 'PostgreSQL, Redis, ClickHouse for analytics, event sourcing, CQRS patterns' },
                { icon: Layers, title: 'Event-Driven Architectures', desc: 'Kafka, RabbitMQ, NATS for reliable message delivery, saga patterns, outbox pattern' },
                { icon: Shield, title: 'Security & Resilience', desc: 'Zero-trust networking, circuit breakers, retry policies, graceful degradation' },
                { icon: Brain, title: 'AI Agent Frameworks', desc: 'Multi-agent systems, RAG pipelines, MCP servers, LLM orchestration and evaluation' },
                { icon: Cpu, title: 'LLM Infrastructure', desc: 'Model serving, vector databases, embedding pipelines, fine-tuning workflows' },
                { icon: Terminal, title: 'Developer Tools & CLIs', desc: 'Internal platforms, code generators, automation scripts, productivity tooling' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technologies */}
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Cpu className="h-6 w-6 text-primary" />
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {siteConfig.about.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium hover:bg-accent transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Currently Exploring (brief) */}
          <div className="border-t border-border pt-8">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              Currently Exploring
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siteConfig.currentlyExploring.map((topic) => (
                <div
                  key={topic}
                  className="group p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
                >
                  <h4 className="font-semibold group-hover:text-primary transition-colors">{topic}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Actively researching and experimenting</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}