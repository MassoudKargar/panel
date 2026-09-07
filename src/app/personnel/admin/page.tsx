'use client'

import { useState } from 'react'

interface RecentRequest {
  id: string
  ip: string
  question: string
  createdAt: string
}

interface Stats {
  window: { since: string; minutes: number; limit: number }
  byIp: { ip: string; count: number }[]
  recent: RecentRequest[]
}

export default function PersonnelAdminPage() {
  const [key, setKey] = useState('')
  const [stats, setStats] = useState<Stats | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadStats() {
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/personnel/admin', { headers: { 'X-Admin-Key': key } })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'دسترسی رد شد')
      setStats(data)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'خطا در دریافت آمار')
    } finally {
      setLoading(false)
    }
  }

  async function resetIp(ip: string) {
    const response = await fetch('/api/personnel/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': key },
      body: JSON.stringify({ ip }),
    })
    const data = await response.json()
    setMessage(response.ok ? `شمارندهٔ ${ip} ریست شد (${data.deleted} رکورد)` : (data.error || 'خطا'))
    if (response.ok) await loadStats()
  }

  async function deleteRecord(id: string) {
    const response = await fetch(`/api/personnel/admin?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': key },
    })
    const data = await response.json()
    setMessage(response.ok ? `رکورد حذف شد (${data.deleted})` : (data.error || 'خطا'))
    if (response.ok) await loadStats()
  }

  async function deleteIp(ip: string) {
    if (!window.confirm(`تمام رکوردهای ${ip} حذف شود؟`)) return
    const response = await fetch(`/api/personnel/admin?ip=${encodeURIComponent(ip)}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Key': key },
    })
    const data = await response.json()
    setMessage(response.ok ? `تمام رکوردهای ${ip} حذف شد (${data.deleted})` : (data.error || 'خطا'))
    if (response.ok) await loadStats()
  }

  return (
    <main dir="rtl" className="min-h-[calc(100vh-4rem)] bg-background px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">مدیریت چت پرسنل</h1>
        <p className="mb-8 text-muted-foreground">آمار سؤال‌ها، ریست شمارنده و حذف رکوردها</p>

        <div className="mb-8 flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row">
          <input
            type="password"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            placeholder="کلید مدیریت"
            className="h-11 flex-1 rounded-lg border border-input bg-background px-4 outline-none focus:ring-2 focus:ring-ring"
          />
          <button onClick={loadStats} disabled={!key || loading} className="h-11 rounded-lg bg-primary px-6 font-medium text-primary-foreground disabled:opacity-50">
            {loading ? 'در حال دریافت...' : 'نمایش آمار'}
          </button>
        </div>

        {message && <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">{message}</div>}

        {stats && (
          <>
            <section className="mb-8 rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 text-xl font-semibold">مصرف یک ساعت اخیر</h2>
              {stats.byIp.length === 0 ? <p className="text-muted-foreground">هنوز درخواستی ثبت نشده.</p> : (
                <div className="overflow-x-auto"><table className="w-full text-right text-sm"><thead><tr className="border-b border-border"><th className="p-3">IP</th><th className="p-3">تعداد</th><th className="p-3">عملیات</th></tr></thead><tbody>
                  {stats.byIp.map((item) => <tr key={item.ip} className="border-b border-border last:border-0"><td className="p-3 font-mono">{item.ip}</td><td className="p-3">{item.count} / {stats.window.limit}</td><td className="p-3"><button onClick={() => resetIp(item.ip)} className="ml-2 rounded bg-secondary px-3 py-1 hover:bg-accent">ریست شمارنده</button><button onClick={() => deleteIp(item.ip)} className="rounded bg-destructive/10 px-3 py-1 text-destructive hover:bg-destructive/20">حذف همه</button></td></tr>)}
                </tbody></table></div>
              )}
            </section>

            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-4 text-xl font-semibold">آخرین سؤال‌ها</h2>
              <div className="space-y-3">
                {stats.recent.map((item) => <div key={item.id} className="rounded-lg border border-border p-4"><div className="mb-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground"><span className="font-mono">{item.ip}</span><span>{new Date(item.createdAt).toLocaleString('fa-IR')}</span></div><p className="mb-3">{item.question}</p><button onClick={() => deleteRecord(item.id)} className="rounded bg-destructive/10 px-3 py-1 text-xs text-destructive hover:bg-destructive/20">حذف رکورد</button></div>)}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
