import Link from 'next/link'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { Github, Linkedin, Youtube, Send, Mail, Rss } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'GitHub', href: siteConfig.social.github, icon: Github },
    { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin },
    { label: 'YouTube', href: siteConfig.social.youtube, icon: Youtube },
    { label: 'Telegram', href: siteConfig.social.telegram, icon: Send },
    { label: 'X/Twitter', href: siteConfig.social.twitter, icon: Mail },
  ].filter((link) => link.href)

  const footerNav = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'RSS', href: '/rss.xml' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ]

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-semibold text-lg tracking-tight">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Software Engineer building systems at the intersection of Code & AI.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-semibold">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-semibold">Connect</h3>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Feeds</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Rss className="h-4 w-4" aria-hidden="true" />
                  RSS Feed
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}