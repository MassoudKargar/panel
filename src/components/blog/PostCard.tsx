import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Tag as TagIcon, ArrowRight } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import type { PostWithTags } from '@/types'

interface PostCardProps {
  post: PostWithTags
  variant?: 'default' | 'featured' | 'compact'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const readingTime = `${post.readingTime} min read`

  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt?.toISOString() || ''}>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {readingTime}
            </span>
          </div>
        </div>
        <ArrowRight className="flex-shrink-0 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </Link>
    )
  }

  return (
    <article className={cn(
      'group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-300',
      variant === 'featured' 
        ? 'hover:border-primary/50 hover:shadow-lg' 
        : 'hover:border-primary/30'
    )}>
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={variant === 'featured'}
            loading={variant === 'featured' ? 'eager' : 'lazy'}
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag.id} variant="outline" size="sm">
              <TagIcon className="h-3 w-3" aria-hidden="true" />
              {tag.name}
            </Tag>
          ))}
          {post.tags.length > 3 && (
            <Tag variant="outline" size="sm" className="text-muted-foreground">
              +{post.tags.length - 3}
            </Tag>
          )}
        </div>

        <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt?.toISOString() || ''}>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {readingTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group"
          >
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}