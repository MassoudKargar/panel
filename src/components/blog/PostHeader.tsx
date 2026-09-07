import { cn } from '@/lib/utils'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Calendar, Clock, Tag as TagIcon, User } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import type { PostWithTags } from '@/types'

interface PostHeaderProps {
  post: PostWithTags
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12 space-y-6">
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag.id} variant="default" size="sm">
            <TagIcon className="h-3 w-3" aria-hidden="true" />
            {tag.name}
          </Tag>
        ))}
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
        {post.title}
      </h1>

      <p className="text-xl text-muted-foreground leading-relaxed border-t border-border pt-6">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border pt-6">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" aria-hidden="true" />
          <span>Alex Chen</span>
        </div>
        <time dateTime={post.publishedAt?.toISOString() || ''} className="flex items-center gap-2">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
        </time>
        {post.updatedAt && post.updatedAt > (post.publishedAt || new Date(0)) && (
          <time dateTime={post.updatedAt.toISOString()} className="flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Updated {formatDate(post.updatedAt)}
          </time>
        )}
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {post.readingTime} min read
        </span>
      </div>

      {post.coverImage && (
        <figure className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
            priority
          />
        </figure>
      )}
    </header>
  )
}