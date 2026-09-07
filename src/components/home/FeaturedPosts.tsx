import { getFeaturedPosts } from '@/lib/posts'
import { PostGrid } from '@/components/blog/PostGrid'

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts(6)

  if (posts.length === 0) return null

  return (
    <section id="posts" className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Latest Writing</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Technical articles on backend engineering, AI, and distributed systems.
            </p>
          </div>
          <a
            href="/blog"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all posts
            <span aria-hidden="true">→</span>
          </a>
        </header>
        <PostGrid posts={posts} />
      </div>
    </section>
  )
}