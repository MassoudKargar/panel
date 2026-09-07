import { PostCard } from './PostCard'
import type { PostWithTags } from '@/types'

interface RelatedPostsProps {
  posts: PostWithTags[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-12 border-t border-border" aria-labelledby="related-posts-heading">
      <h2 id="related-posts-heading" className="text-2xl font-bold mb-8">
        Related Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="default" />
        ))}
      </div>
    </section>
  )
}