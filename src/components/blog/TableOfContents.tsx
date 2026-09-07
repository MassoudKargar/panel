'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { TableOfContentsItem } from '@/types'

interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.slug)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav
      className={cn('hidden lg:block fixed left-[calc(50%+640px)] top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto')}
      aria-label="Table of contents"
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-4">
        On this page
      </h3>
      <ul className="space-y-2 px-4 border-l border-border pl-4">
        {items.map((item) => (
          <li key={item.slug} className="relative">
            <a
              href={`#${item.slug}`}
              className={cn(
                'block text-sm py-1 transition-colors',
                activeId === item.slug
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.slug)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  history.pushState(null, '', `#${item.slug}`)
                  setActiveId(item.slug)
                }
              }}
            >
              {item.text}
            </a>
            {activeId === item.slug && (
              <span className="absolute left-[-14px] top-2 h-4 w-0.5 bg-primary rounded-full" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}