import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getPrevNextPosts } from '@/lib/posts'
import { extractHeadings } from '@/lib/mdx'
import { PostHeader } from '@/components/blog/PostHeader'
import { PostContent } from '@/components/blog/PostContent'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { PrevNextNavigation } from '@/components/blog/PrevNextNavigation'
import { SocialShare } from '@/components/blog/SocialShare'
import type { PostWithTags } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const ogImage = post.coverImage || `${siteUrl}/og-image.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString() || post.publishedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Alex Chen',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alex Chen',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      siteName: 'Alex Chen',
      authors: ['Alex Chen'],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString() || post.publishedAt?.toISOString(),
      tags: post.tags.map((t) => t.name),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: '@alexchen',
    },
    other: {
      'article:published_time': post.publishedAt?.toISOString() || '',
      'article:modified_time': post.updatedAt?.toISOString() || post.publishedAt?.toISOString() || '',
      'article:author': 'Alex Chen',
      'article:tag': post.tags.map((t) => t.name).join(','),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)
  const relatedPosts = await getRelatedPosts(post.id, post.tags.map((t) => t.slug))
  const { prev, next } = await getPrevNextPosts(post.publishedAt)

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <PostHeader post={post} />
      
      <div className="grid gap-12 lg:grid-cols-[1fr_200px]">
        <div>
          <PostContent post={post} />
          
          <SocialShare
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
          />
          
          <RelatedPosts posts={relatedPosts} />
          
          <PrevNextNavigation prev={prev} next={next} />
        </div>

        <aside aria-hidden="true">
          <TableOfContents items={headings} />
        </aside>
      </div>
    </article>
  )
}