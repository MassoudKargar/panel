import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Github, ExternalLink, Tag as TagIcon } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { Card } from '@/components/ui/Card'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  variant?: 'default' | 'featured'
}

export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  return (
    <Card variant="bordered" className={cn('flex flex-col h-full', variant === 'featured' && 'hover:border-primary/50 hover:shadow-lg transition-all')}>
      {project.image && (
        <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col space-y-4">
        <h3 className="font-bold text-xl">{project.title}</h3>
        <p className="text-muted-foreground flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech} variant="outline" size="sm">
              <TagIcon className="h-3 w-3" aria-hidden="true" />
              {tech}
            </Tag>
          ))}
          {project.technologies.length > 5 && (
            <Tag variant="outline" size="sm" className="text-muted-foreground">
              +{project.technologies.length - 5}
            </Tag>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Code
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="View live demo"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}