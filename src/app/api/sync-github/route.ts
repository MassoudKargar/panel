import { NextRequest, NextResponse } from 'next/server'
import { fullSync } from '@/lib/github-sync'

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await fullSync()
    
    const status = result.repositories.success && result.user.success ? 200 : 500
    
    return NextResponse.json({
      success: result.repositories.success && result.user.success,
      repositories: result.repositories,
      user: result.user,
      timestamp: new Date().toISOString(),
    }, { status })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Allow manual trigger via GET with secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return POST(request)
}