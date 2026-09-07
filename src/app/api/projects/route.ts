import { NextRequest, NextResponse } from 'next/server'
import { getAllRepositories } from '@/lib/repositories'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const filters = {
    search: searchParams.get('search') || undefined,
    language: searchParams.get('language') || undefined,
    topic: searchParams.get('topic') || undefined,
    category: searchParams.get('category') || undefined,
    featured: searchParams.get('featured') === 'true',
    archived: searchParams.get('archived') === 'true',
    fork: searchParams.get('fork') === 'true',
    sort: (searchParams.get('sort') as any) || 'updated',
    order: (searchParams.get('order') as any) || 'desc',
    page: parseInt(searchParams.get('page') || '1'),
    pageSize: parseInt(searchParams.get('pageSize') || '24'),
  }

  try {
    const result = await getAllRepositories(filters)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}