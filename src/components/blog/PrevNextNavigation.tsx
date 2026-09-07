import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PrevNextNavigationProps {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

export function PrevNextNavigation({ prev, next }: PrevNextNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav className="mt-16 pt-8 border-t border-border" aria-label="Article navigation">
      <div className="grid gap-4 md:grid-cols-2">
        {prev && (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex-shrink-0 text-primary group-hover:translate-x-[-4px] transition-transform">
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Previous
              </span>
              <h3 className="mt-1 font-semibold text-lg group-hover:text-primary transition-colors truncate">
                {prev.title}
              </h3>
            </div>
          </Link>
        )}

        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors md:justify-end"
          >
            <div className="min-w-0 text-right">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Next
              </span>
              <h3 className="mt-1 font-semibold text-lg group-hover:text-primary transition-colors truncate">
                {next.title}
              </h3>
            </div>
            <div className="flex-shrink-0 text-primary group-hover:translate-x-[4px] transition-transform">
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </div>
          </Link>
        )}
      </div>
    </nav>
  )
}