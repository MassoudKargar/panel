import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Github, Linkedin, Youtube, Send, Mail, ArrowRight } from 'lucide-react'

export function CTASection() {
  const socialLinks = [
    { label: 'GitHub', href: siteConfig.social.github, icon: Github },
    { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin },
    { label: 'YouTube', href: siteConfig.social.youtube, icon: Youtube },
    { label: 'Telegram', href: siteConfig.social.telegram, icon: Send },
    { label: 'X/Twitter', href: siteConfig.social.twitter, icon: Mail },
  ].filter((link) => link.href)

  const buttonStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  const primaryStyles = 'bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-lg'
  const outlineStyles = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 text-lg'

  return (
    <section id="cta" className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          {siteConfig.cta.headline}
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          {siteConfig.cta.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className={cn(buttonStyles, primaryStyles)}
          >
            <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
            Get in touch
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonStyles, outlineStyles)}
          >
            <Github className="mr-2 h-5 w-5" aria-hidden="true" />
            View on GitHub
          </a>
        </div>

        <p className="text-sm text-muted-foreground/70 mb-6">Or connect elsewhere:</p>
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}