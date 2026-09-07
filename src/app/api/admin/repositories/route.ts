import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RepositoryMetadataCreate {
  name: string
  description?: string | null
  htmlUrl?: string | null
  featured?: boolean
  priority?: number
  category?: string | null
  customDescription?: string | null
  customTechnologies?: string[]
  whyIBuiltIt?: string | null
  architecture?: string | null
  challenges?: string | null
  whatILearned?: string | null
}

export async function POST(request: NextRequest) {
  try {
    const body: RepositoryMetadataCreate = await request.json()

    // Validate required fields
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json(
        { error: 'Repository name is required' },
        { status: 400 }
      )
    }

    // Validate priority
    if (body.priority !== undefined && (body.priority < 0 || body.priority > 100)) {
      return NextResponse.json(
        { error: 'Priority must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ['Backend', 'AI', 'Architecture', 'Tooling', 'Other']
    if (body.category !== undefined && body.category !== null && !validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: `Category must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if repository with this slug already exists
    const existingSlug = await prisma.repository.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (existingSlug) {
      return NextResponse.json(
        { error: 'A repository with this name already exists' },
        { status: 409 }
      )
    }

    const repository = await prisma.repository.create({
              data: {
                githubId: 0, // Manual entry, no GitHub ID
                slug,
                name: body.name,
                fullName: body.name,
                description: body.description,
                htmlUrl: body.htmlUrl,
                featured: body.featured ?? false,
                priority: body.priority ?? 0,
                category: body.category,
                customDescription: body.customDescription,
                customTechnologies: body.customTechnologies,
                whyIBuiltIt: body.whyIBuiltIt,
                architecture: body.architecture,
                challenges: body.challenges,
                whatILearned: body.whatILearned,
                ownerLogin: 'manual', // Mark as manually created
                lastSyncedAt: new Date(),
                syncedAt: new Date(),
                // Required fields for Prisma
                createdAt: new Date(),
                updatedAt: new Date(),
                visibility: 'public',
              },
            })

    return NextResponse.json({ success: true, data: repository }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to create repository:', error)

    // Handle Prisma unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A repository with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create repository' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '24')
    const search = searchParams.get('search') || undefined
    const category = searchParams.get('category') || undefined
    const featuredParam = searchParams.get('featured') || undefined
    const sort = (searchParams.get('sort') as any) || 'updatedAt'
    const order = (searchParams.get('order') as 'asc' | 'desc') || 'desc'

    const where: any = {
      ownerLogin: 'MassoudKargar',
    }

    if (featuredParam !== undefined) {
      where.featured = featuredParam === 'true'
    }

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
        { customDescription: { contains: search, mode: 'insensitive' } },
        { topics: { has: search } },
      ]
    }

    const orderBy: any = {}
    orderBy[sort] = order

    const [repos, total] = await Promise.all([
      prisma.repository.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.repository.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        data: repos,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params

  try {
    // Soft delete - mark as archived instead of removing
    await prisma.repository.update({
      where: { id: resolvedParams.id },
      data: {
        isArchived: true,
        lastSyncedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete repository:', error)
    return NextResponse.json(
      { error: 'Failed to delete repository' },
      { status: 500 }
    )
  }
}