import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRepositoryBySlug, getGitHubUser, getRepositoryStats } from '@/lib/repositories'
import { RepositoryDetail } from '@/components/projects/RepositoryDetail'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // We'll generate static params for featured repositories
  // For now, return empty - we'll use dynamic rendering
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const repository = await getRepositoryBySlug(resolvedParams.slug)

  if (!repository) {
    return { title: 'Project Not Found' }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const projectUrl = `${siteUrl}/projects/${repository.slug}`
  const ogImage = repository.homepageUrl || `${siteUrl}/og-image.png`

  const displayDescription = repository.customDescription || repository.description

  return {
    title: repository.name,
    description: displayDescription || undefined,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: 'website',
      url: projectUrl,
      title: `${repository.name} — Masoud Kargar`,
      description: displayDescription || undefined,
      siteName: 'Masoud Kargar',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: repository.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${repository.name} — Masoud Kargar`,
      description: displayDescription || undefined,
      images: [ogImage],
    },
    other: {
      'article:tag': repository.topics.join(','),
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const repository = await getRepositoryBySlug(resolvedParams.slug)

  if (!repository) {
    notFound()
  }

  return <RepositoryDetail repository={repository} />
}