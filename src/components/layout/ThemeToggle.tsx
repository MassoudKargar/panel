'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-muted" aria-label="Theme toggle">
        <span className="sr-only">Loading theme...</span>
      </button>
    )
  }

  const icons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <Monitor className="h-5 w-5" />,
  }

  const labels = {
    light: 'Switch to dark mode',
    dark: 'Switch to system theme',
    system: 'Switch to light mode',
  }

  const nextTheme = (() => {
    if (theme === 'light') return 'dark'
    if (theme === 'dark') return 'system'
    return 'light'
  })()

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className={cn(
        'p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
      aria-label={labels[theme as keyof typeof labels] || 'Toggle theme'}
      title={labels[theme as keyof typeof labels] || 'Toggle theme'}
    >
      {icons[theme as keyof typeof icons] || icons.system}
    </button>
  )
}