import { PostCard } from './PostCard'
import type { PostWithTags } from '@/types'

interface PostGridProps {
  posts: PostWithTags[]
  variant?: 'default' | 'featured'
  columns?: 1 | 2 | 3
}

export function PostGrid({ posts, variant = 'default', columns = 3 }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No posts found.</p>
      </div>
    )
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={gridCols[columns]} role="list" aria-label="Blog posts">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} variant={variant} />
      ))}
    </div>
  )
}