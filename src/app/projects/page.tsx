import { Metadata } from 'next'
import { getAllRepositories, getAllLanguages, getAllTopics, getAllCategories } from '@/lib/repositories'
import { ProjectsPageClient } from '@/components/projects/ProjectsPageClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects I\'ve built and maintain. Open source, side projects, and experiments.',
}

export default async function ProjectsPage() {
  const [repositoriesResult, languages, topics, categories] = await Promise.all([
    getAllRepositories({ page: 1, pageSize: 24 }),
    getAllLanguages(),
    getAllTopics(),
    getAllCategories(),
  ])

  return (
    <ProjectsPageClient
      initialRepositories={repositoriesResult.data}
      initialPagination={{
        total: repositoriesResult.total,
        page: repositoriesResult.page,
        pageSize: repositoriesResult.pageSize,
        totalPages: repositoriesResult.totalPages,
      }}
      languages={languages}
      topics={topics}
      categories={categories}
    />
  )
}