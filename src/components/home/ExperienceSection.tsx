import { cn } from '@/lib/utils'
import { Calendar, Building2, MapPin, Code2 } from 'lucide-react'

interface ExperienceItem {
  company: string
  position: string
  startDate: string
  endDate: string | 'Present'
  location: string
  description: string[]
  technologies: string[]
  achievements: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'Current Company',
    position: 'Senior Backend Engineer',
    startDate: '2022',
    endDate: 'Present',
    location: 'Remote',
    description: [
      'Leading backend architecture for high-scale distributed systems',
      'Designing and implementing microservices with .NET and Go',
      'Building event-driven systems with Kafka and RabbitMQ',
      'Mentoring junior engineers and conducting code reviews',
    ],
    technologies: ['.NET 8', 'C#', 'Go', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'gRPC'],
    achievements: [
      'Reduced API latency by 40% through caching optimization',
      'Migrated monolith to microservices serving 1M+ requests/day',
      'Implemented observability stack with OpenTelemetry and Grafana',
    ],
  },
  {
    company: 'Previous Company',
    position: 'Backend Engineer',
    startDate: '2019',
    endDate: '2022',
    location: 'Tehran, Iran',
    description: [
      'Developed and maintained REST APIs and gRPC services',
      'Built real-time systems with SignalR and WebSockets',
      'Optimized database queries and implemented caching strategies',
      'Worked on CI/CD pipelines and deployment automation',
    ],
    technologies: ['.NET Core', 'C#', 'SQL Server', 'Entity Framework', 'RabbitMQ', 'Docker', 'Azure'],
    achievements: [
      'Delivered 15+ production features with zero critical bugs',
      'Improved deployment frequency from weekly to daily',
      'Reduced infrastructure costs by 30% through optimization',
    ],
  },
  {
    company: 'Early Career Company',
    position: 'Software Engineer',
    startDate: '2016',
    endDate: '2019',
    location: 'Tehran, Iran',
    description: [
      'Full-stack development with ASP.NET MVC and AngularJS',
      'Database design and stored procedure optimization',
      'Integrated third-party APIs and payment gateways',
      'Participated in agile development processes',
    ],
    technologies: ['C#', 'ASP.NET MVC', 'SQL Server', 'JavaScript', 'AngularJS', 'jQuery'],
    achievements: [
      'Built customer-facing portal serving 10K+ users',
      'Automated manual processes saving 20 hours/week',
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Engineering Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Building scalable systems across fintech, e-commerce, and enterprise domains.
          </p>
        </header>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <article 
              key={exp.company} 
              className="group relative bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {exp.position}
                  </h3>
                  <p className="text-lg text-primary mt-1">{exp.company}</p>
                </div>
                <div className="flex flex-col items-end text-right lg:items-end text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500/50 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-muted/50 border border-border text-sm font-medium hover:bg-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}