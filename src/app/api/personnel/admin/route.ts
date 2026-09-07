import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis'
import { prisma } from '@/lib/prisma'

const globalForRedis = globalThis as unknown as { redis?: Redis }
function getRedis(): Redis {
  if (!globalForRedis.redis) {
    globalForRedis.redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
      maxRetriesPerRequest: 2,
      lazyConnect: false,
    })
  }
  return globalForRedis.redis
}

function authorized(request: NextRequest): boolean {
  const expected = process.env.PERSONNEL_ADMIN_KEY || ''
  const supplied = request.headers.get('x-admin-key') || ''
  return Boolean(expected) && supplied === expected
}

function unauthorized() {
  return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 401 })
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return unauthorized()

  const since = new Date(Date.now() - 60 * 60 * 1000)
  const [recent, byIp] = await Promise.all([
    prisma.chatRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: { id: true, ip: true, question: true, createdAt: true },
    }),
    prisma.chatRequest.groupBy({
      by: ['ip'],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { ip: 'desc' } },
    }),
  ])

  return NextResponse.json({
    window: { since, minutes: 60, limit: 10 },
    byIp: byIp.map((item) => ({ ip: item.ip, count: item._count._all })),
    recent,
  })
}

export async function DELETE(request: NextRequest) {
  if (!authorized(request)) return unauthorized()

  const ip = request.nextUrl.searchParams.get('ip')
  const id = request.nextUrl.searchParams.get('id')
  if (!ip && !id) return NextResponse.json({ error: 'ip یا id لازم است' }, { status: 400 })

  const result = id
    ? await prisma.chatRequest.deleteMany({ where: { id } })
    : await prisma.chatRequest.deleteMany({ where: { ip: ip as string } })

  return NextResponse.json({ deleted: result.count })
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return unauthorized()

  const body = await request.json().catch(() => ({})) as { ip?: unknown }
  const ip = typeof body.ip === 'string' ? body.ip.trim() : ''
  if (!ip) return NextResponse.json({ error: 'ip لازم است' }, { status: 400 })

  const since = new Date(Date.now() - 60 * 60 * 1000)
  const result = await prisma.chatRequest.deleteMany({ where: { ip, createdAt: { gte: since } } })

  // Also clear the Redis rate-limit counter so the quota resets immediately.
  const redis = getRedis()
  let clearedCounter = 0
  if (redis.status === 'ready') {
    clearedCounter = await redis.del(`rl:personnel:chat:${ip}`).catch(() => 0)
  }
  return NextResponse.json({ reset: ip, deleted: result.count, clearedCounter })
}
