import { type Post, type Tag, type Project } from '@prisma/client'

export type PostWithTags = Post & {
  tags: Tag[]
}

export type ProjectWithRelations = Project

export type { Post, Tag, Project }

export interface PostCardProps {
  post: PostWithTags
  variant?: 'default' | 'featured' | 'compact'
}

export interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'featured'
}

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  twitterHandle?: string
  jsonLd?: Record<string, unknown>
}

export interface TableOfContentsItem {
  level: number
  text: string
  slug: string
}

export interface ReadingTimeResult {
  text: string
  minutes: number
  time: number
  words: number
}