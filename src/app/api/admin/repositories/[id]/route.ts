import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RepositoryMetadataUpdate {
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  
  try {
    const body: RepositoryMetadataUpdate = await request.json()
    
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

    const repository = await prisma.repository.update({
      where: { id: resolvedParams.id },
      data: {
        featured: body.featured,
        priority: body.priority,
        category: body.category,
        customDescription: body.customDescription,
        customTechnologies: body.customTechnologies,
        whyIBuiltIt: body.whyIBuiltIt,
        architecture: body.architecture,
        challenges: body.challenges,
        whatILearned: body.whatILearned,
      },
    })

    return NextResponse.json({ success: true, data: repository })
  } catch (error) {
    console.error('Failed to update repository metadata:', error)
    return NextResponse.json(
      { error: 'Failed to update repository metadata' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params

  try {
    const repository = await prisma.repository.findUnique({
      where: { id: resolvedParams.id },
    })

    if (!repository) {
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: repository })
  } catch (error) {
    console.error('Failed to fetch repository:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repository' },
      { status: 500 }
    )
  }
}