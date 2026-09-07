import { MDXRemote } from 'next-mdx-remote/rsc'
import { components } from '@/components/ui/Prose'
import type { MDXComponents } from 'mdx/types'

interface MDXContentProps {
  source: string
  components?: MDXComponents
}

export async function MDXContent({ source, components: customComponents }: MDXContentProps) {
  // Ensure components is never undefined
  const finalComponents = { ...components, ...(customComponents || {}) }
  
  return (
    <MDXRemote
      source={source}
      components={finalComponents}
      options={{ parseFrontmatter: true }}
    />
  )
}

export function extractHeadings(source: string): Array<{ level: number; text: string; slug: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; slug: string }> = []
  let match

  while ((match = headingRegex.exec(source)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ level, text, slug })
  }

  return headings
}

export function calculateReadingTime(content: string): { text: string; minutes: number; time: number; words: number } {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  const time = minutes * 60 * 1000

  return {
    text: `${minutes} min read`,
    minutes,
    time,
    words,
  }
}