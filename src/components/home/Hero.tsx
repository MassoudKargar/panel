import { cn } from '@/lib/utils'
import { ArrowRight, ExternalLink, Github, Mail, Linkedin, Youtube, Send, Star, Users, Code2, BookOpen } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Software Engineer • Backend × Distributed Systems × AI
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
          {siteConfig.hero.headline}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          {siteConfig.hero.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://github.com/MassoudKargar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-lg w-full sm:w-auto"
          >
            <Github className="mr-2 h-5 w-5" aria-hidden="true" />
            View GitHub
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="/projects"
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 text-lg w-full sm:w-auto"
          >
            Explore Projects
            <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="/blog"
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 text-lg w-full sm:w-auto hidden sm:inline-flex"
          >
            <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
            Read Blog
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 text-lg w-full sm:w-auto hidden sm:inline-flex"
          >
            <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
            Contact Me
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 text-muted-foreground/60">
          {Object.entries(siteConfig.social)
            .filter(([, url]) => url)
            .map(([platform, url]) => (
              <a
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 hover:text-primary transition-colors"
                aria-label={platform}
              >
                <span className="sr-only">{platform}</span>
                {platform === 'github' && <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>}
                {platform === 'linkedin' && <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                {platform === 'youtube' && <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                {platform === 'telegram' && <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.912 4.255c-.665-1.868-2.378-3.31-4.336-3.362C16.217.748 12.592.5 9.02.745 4.815 1.026 1.056 2.777.307 5.58c-.819 3.078-.106 5.91 1.488 8.15 1.135 1.604 3.307 2.698 5.47 2.36 1.258-.196 2.816-1.155 3.65-2.05.586-.631 2.276-1.353 2.694-.177.163.458.106.925-.032 1.302-1.306 3.533-3.457 4.142-5.536 2.985-.628 2.567-2.154 3.501-5.573 1.923-1.568-1.087-.702-.069-1.32-.95-2.09-.868-.166-.319-.252-.682-.252-1.039 0-.695.53-1.234 1.273-1.328.446-.057.884.11 1.367.454.959.684 1.085 1.467.645 2.316-.516 1.003-1.354 2.568-3.258 2.476-.77-.039-1.636-.144-2.013-.838-.551-1.011-.744-2.58-.173-3.805.488-1.042 1.334-1.67 2.518-1.732.489-.025.892.058 1.384.194.916.251 1.482 1.012 1.482 1.904 0 .822-.38 1.74-1.577 1.74-.62 0-1.26-.299-1.63-.992-.35-.61-.273-1.656.214-2.195.447-.495 1.35-.905 2.142-1.15.723-.223 1.17-.477 1.52-.991.454-.671.371-1.69-.418-2.356-.605-.508-1.774-.608-2.728-.394-.98.22-1.588.716-2.253 1.12-.78.475-1.23 1.307-1.564 2.076-.15.347-.388.824-.239 1.067.147.24.338.343.63.42.66.179 1.353-.125 1.965-.68.661-.597 1.14-1.51 1.277-2.542.14-.996-.236-1.853-1.002-2.34z"/></svg>}
                {platform === 'twitter' && <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.306.93-8.502-9.24-8.502 9.24-3.306-.93 8.502-9.24-7.227-8.26h3.308l7.227 8.26-8.502-9.24 3.306-.93 8.502 9.24 8.502-9.24 3.306.93-8.502 9.24 7.227 8.26z"/></svg>}
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}