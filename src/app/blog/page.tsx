import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { PostGrid } from '@/components/blog/PostGrid'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical articles on backend engineering, AI, distributed systems, and more.',
}

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()])

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Technical articles on backend engineering, AI, distributed systems, and more.
        </p>
      </header>

      {tags.length > 0 && (
        <nav className="mb-12" aria-label="Tag filters">
          <ul className="flex flex-wrap gap-3">
            <li>
              <a
                href="/blog"
                className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground"
                aria-current="page"
              >
                All
              </a>
            </li>
            {tags.map((tag) => (
              <li key={tag.id}>
                <a
                  href={`/blog?tag=${tag.slug}`}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  {tag.name} ({tag._count.posts})
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <PostGrid posts={posts} columns={3} />
    </div>
  )
}