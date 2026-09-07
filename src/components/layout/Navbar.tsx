'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-semibold text-xl tracking-tight" aria-label={siteConfig.name}>
              {siteConfig.name}
            </Link>

            <div className="hidden md:flex md:items-center md:gap-6">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary relative',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                  {pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-primary" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200 ease-in-out border-t border-border bg-background',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-2 text-base font-medium rounded-lg transition-colors',
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? 'bg-accent text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}