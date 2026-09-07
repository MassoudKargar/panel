import { NextRequest, NextResponse } from 'next/server'
import Redis from 'ioredis'
import { prisma } from '@/lib/prisma'

const RATE_LIMIT = 10
const WINDOW_SECONDS = 60 * 60
const RAG_URL = process.env.RAG_API_URL || 'https://rag.masoudkargar.com/v1/chat/completions'

// Lazily-initialized Redis client (localhost only, password from env file).
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

function getClientIp(request: NextRequest): string {
  const cloudflareIp = request.headers.get('cf-connecting-ip')
  if (cloudflareIp) return cloudflareIp.trim()

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function errorResponse(message: string, status: number, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ error: message, ...extra }, { status })
}

export async function POST(request: NextRequest) {
  let body: { question?: unknown }
  try {
    body = await request.json()
  } catch {
    return errorResponse('درخواست نامعتبر است.', 400)
  }

  const question = typeof body.question === 'string' ? body.question.trim() : ''
  if (!question) return errorResponse('لطفاً سؤال خود را وارد کنید.', 400)
  if (question.length > 4000) return errorResponse('سؤال بیش از حد طولانی است.', 400)

  const ip = getClientIp(request)
  const redis = getRedis()
  const key = `rl:personnel:chat:${ip}`

  // Atomic fixed-window counter in Redis: INCR then set TTL on first hit.
  let count: number
  let ttl: number
  try {
    count = await redis.incr(key)
    if (count === 1) await redis.expire(key, WINDOW_SECONDS)
    ttl = await redis.ttl(key)
  } catch (error) {
    console.error('Redis unavailable, falling back to allow:', error)
    count = 0
    ttl = 0
  }

  if (count > RATE_LIMIT) {
    const retryAfter = Math.max(1, ttl)
    return errorResponse('سقف مجاز سؤال‌ها برای این IP در یک ساعت پر شده است.', 429, {
      count: RATE_LIMIT,
      limit: RATE_LIMIT,
      retryAfter,
    })
  }

  // Audit log (best-effort, durable in PostgreSQL for the admin panel).
  await prisma.chatRequest.create({ data: { ip, question } }).catch((error) => {
    console.error('Failed to persist chat request:', error)
  })

  try {
    const ragResponse = await fetch(RAG_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.RAG_API_KEY || '',
      },
      body: JSON.stringify({
        model: process.env.RAG_CHAT_MODEL || 'nvidia/nemotron-3-nano-30b-a3b:free',
        messages: [{ role: 'user', content: question }],
        stream: false,
      }),
      cache: 'no-store',
    })

    const data = await ragResponse.json().catch(() => null)
    if (!ragResponse.ok) {
      console.error('RAG request failed:', ragResponse.status)
      return errorResponse('سرویس پاسخ‌گویی موقتاً در دسترس نیست.', 502)
    }

    const answer = data?.choices?.[0]?.message?.content
    if (typeof answer !== 'string') return errorResponse('پاسخ معتبری از سرویس دریافت نشد.', 502)

    return NextResponse.json({ answer, count, limit: RATE_LIMIT })
  } catch (error) {
    console.error('RAG connection failed:', error)
    return errorResponse('اتصال به سرویس پاسخ‌گویی برقرار نشد.', 502)
  }
}

export async function DELETE(request: NextRequest) {
  // Remove an IP from the Redis rate-limit counter (same auth as admin API).
  const expected = process.env.PERSONNEL_ADMIN_KEY || ''
  const supplied = request.headers.get('x-admin-key') || ''
  if (!expected || supplied !== expected) return errorResponse('دسترسی غیرمجاز', 401)

  const ip = request.nextUrl.searchParams.get('ip')
  if (!ip) return errorResponse('ip لازم است', 400)

  const redis = getRedis()
  let removed = 0
  if (redis.status === 'ready') {
    removed = await redis.del(`rl:personnel:chat:${ip}`).catch(() => 0)
  }
  return NextResponse.json({ reset: ip, clearedCounter: removed })
}