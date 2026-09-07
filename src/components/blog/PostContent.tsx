import { cn } from '@/lib/utils'
import { MDXContent } from '@/lib/mdx'
import type { PostWithTags } from '@/types'

interface PostContentProps {
  post: PostWithTags
}

export async function PostContent({ post }: PostContentProps) {
  return (
    <article className={cn('prose prose-lg prose-neutral dark:prose-invert max-w-none')}>
      <MDXContent source={post.content} />
    </article>
  )
}