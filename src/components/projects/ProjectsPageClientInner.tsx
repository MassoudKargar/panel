'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RepositoryGrid } from '@/components/projects/RepositoryGrid'
import { Repository } from '@/components/projects/RepositoryGrid'
import { Search, Filter, ChevronDown, ChevronUp, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectsPageClientInnerProps {
  initialRepositories: Repository[]
  initialPagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  languages: string[]
  topics: string[]
  categories: string[]
}

export function ProjectsPageClientInner({ 
  initialRepositories, 
  initialPagination,
  languages,
  topics,
  categories
}: ProjectsPageClientInnerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [language, setLanguage] = useState(searchParams.get('language') || '')
  const [topic, setTopic] = useState(searchParams.get('topic') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [featured, setFeatured] = useState(searchParams.get('featured') === 'true')
  const [archived, setArchived] = useState(searchParams.get('archived') === 'true')
  const [fork, setFork] = useState(searchParams.get('fork') === 'true')
  const [sort, setSort] = useState(searchParams.get('sort') || 'updatedAt')
  const [order, setOrder] = useState(searchParams.get('order') || 'desc')

  const fetchRepositories = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', pagination.page.toString())
      params.set('pageSize', pagination.pageSize.toString())
      
      if (search) params.set('search', search)
      if (language) params.set('language', language)
      if (topic) params.set('topic', topic)
      if (category) params.set('category', category)
      if (featured) params.set('featured', 'true')
      if (archived) params.set('archived', 'true')
      if (fork) params.set('fork', 'true')
      params.set('sort', sort)
      params.set('order', order)

      const response = await fetch(`/api/projects?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setRepositories(data.data)
        setPagination(prev => ({ ...prev, total: data.total, totalPages: data.totalPages }))
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error)
    } finally {
      setLoading(false)
    }
  }, [search, language, topic, category, featured, archived, fork, sort, order, pagination.page, pagination.pageSize])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (language) params.set('language', language)
    if (topic) params.set('topic', topic)
    if (category) params.set('category', category)
    if (featured) params.set('featured', 'true')
    if (archived) params.set('archived', 'true')
    if (fork) params.set('fork', 'true')
    params.set('sort', sort)
    params.set('order', order)
    params.set('page', pagination.page.toString())
    
    router.push(`/projects?${params.toString()}`, { scroll: false })
  }, [search, language, topic, category, featured, archived, fork, sort, order, pagination.page, router])

  // Fetch when page changes
  useEffect(() => {
    fetchRepositories()
  }, [fetchRepositories])

  const clearFilters = () => {
    setSearch('')
    setLanguage('')
    setTopic('')
    setCategory('')
    setFeatured(false)
    setArchived(false)
    setFork(false)
    setSort('updatedAt')
    setOrder('desc')
  }

  const hasActiveFilters = search || language || topic || category || featured || archived || fork

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          A collection of projects I&apos;ve built and maintain. Open source, side projects, and experiments.
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors',
              hasActiveFilters && 'border-primary bg-primary/5 text-primary'
            )}
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                {[
                  search && 1,
                  language && 1,
                  topic && 1,
                  category && 1,
                  featured && 1,
                  archived && 1,
                  fork && 1,
                ].filter(Boolean).length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              <option value="updatedAt">Recently Updated</option>
              <option value="createdAt">Recently Created</option>
              <option value="pushedAt">Recently Pushed</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="name">Name</option>
            </select>

            <button
              onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
              className="p-2 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              aria-label={order === 'desc' ? 'Sort ascending' : 'Sort descending'}
            >
              {order === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 border border-border rounded-lg bg-muted/30">
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
              <select
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm">Featured only</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="archived"
                  checked={archived}
                  onChange={(e) => setArchived(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="archived" className="text-sm">Archived</label>
              </div>
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {pagination.total} repository{pagination.total !== 1 ? 's' : ''} found
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </div>
      </div>

      {/* Repository Grid */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <RepositoryGrid 
          repositories={repositories} 
          variant="default"
          emptyMessage="No repositories found matching your criteria."
        />
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1 || loading}
            className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum: number
              if (pagination.totalPages <= 5) {
                pageNum = i + 1
              } else if (pagination.page <= 3) {
                pageNum = i + 1
              } else if (pagination.page >= pagination.totalPages - 2) {
                pageNum = pagination.totalPages - 4 + i
              } else {
                pageNum = pagination.page - 2 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                  className={cn(
                    'w-10 h-10 rounded-lg font-medium transition-colors',
                    pagination.page === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-accent'
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.totalPages || loading}
            className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}