import { cn } from '@/lib/utils'
import { forwardRef, type HTMLAttributes } from 'react'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', size = 'md', icon, children, ...props }, ref) => {
    const variants = {
      default: 'bg-secondary text-secondary-foreground',
      outline: 'border border-border bg-transparent',
      filled: 'bg-primary text-primary-foreground',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-1.5 rounded-full font-medium', variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    )
  }
)

Tag.displayName = 'Tag'