'use client'

import { Suspense } from 'react'
import { ProjectsPageClientInner } from './ProjectsPageClientInner'
import { Loader2 } from 'lucide-react'

export function ProjectsPageClient({ 
  initialRepositories, 
  initialPagination,
  languages,
  topics,
  categories
}: {
  initialRepositories: any[]
  initialPagination: any
  languages: string[]
  topics: string[]
  categories: string[]
}) {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    }>
      <ProjectsPageClientInner
        initialRepositories={initialRepositories}
        initialPagination={initialPagination}
        languages={languages}
        topics={topics}
        categories={categories}
      />
    </Suspense>
  )
}