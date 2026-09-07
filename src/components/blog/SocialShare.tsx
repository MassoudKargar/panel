'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Twitter, Linkedin, Mail, Copy, Check } from 'lucide-react'

interface SocialShareProps {
  url: string
  title: string
  description?: string
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = (platform: string, shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDesc = encodeURIComponent(description || '')

  return (
    <div className="flex items-center gap-3" role="list" aria-label="Share this article">
      <span className="text-sm text-muted-foreground">Share:</span>
      
      <button
        onClick={() => shareUrl('Twitter', `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)}
        className={cn('p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors')}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        onClick={() => shareUrl('LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
        className={cn('p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors')}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        onClick={() => shareUrl('Email', `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`)}
        className={cn('p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors')}
        aria-label="Share via email"
      >
        <Mail className="h-5 w-5" aria-hidden="true" />
      </button>

      <button
        onClick={handleCopy}
        className={cn('p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors')}
        aria-label={copied ? 'Copied to clipboard' : 'Copy link'}
      >
        {copied ? (
          <Check className="h-5 w-5 text-primary" aria-hidden="true" />
        ) : (
          <Copy className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}