'use client'

import { FormEvent, useState } from 'react'
import { MessageCircle, Send, ShieldCheck, Clock3 } from 'lucide-react'

export function PersonnelChat() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!question.trim() || loading) return
    setLoading(true)
    setError('')
    setAnswer('')

    try {
      const response = await fetch('/api/personnel/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const raw = await response.text()
      let data: { answer?: string; count?: number; error?: string }
      try {
        data = JSON.parse(raw)
      } catch {
        // Reverse proxy / Cloudflare may swap 5xx bodies for HTML pages —
        // surface a clean Persian message instead of a JSON parse crash.
        setError('سرویس پاسخ‌گویی موقتاً در دسترس نیست. دقایقی بعد دوباره تلاش کنید.')
        return
      }
      if (!response.ok) throw new Error(data.error || 'خطایی رخ داد.')
      setAnswer(data.answer ?? '')
      setCount(data.count ?? null)
      setQuestion('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی رخ داد.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="personnel-chat" dir="rtl" className="bg-muted/30 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <MessageCircle className="h-4 w-4" /> دستیار هوشمند پرسنل
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">سؤال خود را بپرسید</h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            پاسخ‌ها بر اساس آیین‌نامه‌ها و اسناد سازمانی ارائه می‌شوند.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <form onSubmit={submit}>
            <label htmlFor="personnel-question" className="mb-3 block text-sm font-medium">سؤال شما</label>
            <textarea
              id="personnel-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="مثلاً شرایط دریافت وام مسکن چیست؟"
              rows={4}
              maxLength={4000}
              className="w-full resize-y rounded-xl border border-input bg-background p-4 text-base outline-none transition focus:ring-2 focus:ring-ring"
              disabled={loading}
            />
            <div className="mt-4 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> حریم خصوصی رعایت می‌شود</span>
                <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> سقف ۱۰ سؤال در ساعت</span>
              </div>
              <button
                type="submit"
                disabled={!question.trim() || loading}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'در حال بررسی...' : 'ارسال سؤال'}
                <Send className="mr-2 h-4 w-4" />
              </button>
            </div>
          </form>

          {error && <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</div>}
          {answer && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="mb-3 text-lg font-semibold">پاسخ دستیار</h3>
              <div className="whitespace-pre-wrap rounded-xl bg-muted/50 p-5 leading-8">{answer}</div>
              {count !== null && <p className="mt-3 text-xs text-muted-foreground">مصرف این IP در این ساعت: {count} از ۱۰</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
