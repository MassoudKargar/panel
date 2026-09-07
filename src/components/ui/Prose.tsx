import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

const customComponents: MDXComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 {...props} className={cn('text-4xl font-bold tracking-tight mt-10 mb-4', props.className)}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 {...props} className={cn('text-3xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border', props.className)}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 {...props} className={cn('text-2xl font-semibold tracking-tight mt-8 mb-3', props.className)}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 {...props} className={cn('text-xl font-semibold tracking-tight mt-6 mb-2', props.className)}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p {...props} className={cn('lead text-muted-foreground mt-4 mb-4', props.className)}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }: any) => (
    <a
      {...props}
      href={href}
      className={cn('text-primary font-medium underline underline-offset-2 hover:no-underline transition-colors', props.className)}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: any) => (
    <ul {...props} className={cn('list-disc list-inside space-y-2 mt-4 mb-4 ml-4', props.className)}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol {...props} className={cn('list-decimal list-inside space-y-2 mt-4 mb-4 ml-4', props.className)}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li {...props} className={cn('text-foreground', props.className)}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote {...props} className={cn('border-l-4 border-primary pl-6 italic text-muted-foreground my-6', props.className)}>
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }: any) => {
    const isInline = !className?.includes('language-')
    if (isInline) {
      return (
        <code {...props} className={cn('bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary', className)}>
          {children}
        </code>
      )
    }
    return <code {...props} className={cn(className)} />
  },
  pre: ({ children, ...props }: any) => (
    <pre {...props} className={cn('bg-muted/50 border border-border rounded-xl p-4 overflow-x-auto mt-4 mb-4', props.className)}>
      {children}
    </pre>
  ),
  table: ({ children, ...props }: any) => (
    <div className={cn('overflow-x-auto my-6', props.className)}>
      <table className={cn('w-full border-collapse', props.className)}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th {...props} className={cn('border border-border px-4 py-2 text-left font-semibold bg-muted', props.className)}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td {...props} className={cn('border border-border px-4 py-2', props.className)}>
      {children}
    </td>
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: ({ children, ...props }: any) => <strong {...props} className={cn('font-semibold', props.className)}>{children}</strong>,
  em: ({ children, ...props }: any) => <em {...props} className={cn('italic', props.className)}>{children}</em>,
  img: ({ src, alt, ...props }: any) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        {...props}
        className={cn('rounded-xl border border-border max-w-full h-auto', props.className)}
      />
      {alt && <figcaption className="text-center text-sm text-muted-foreground mt-2">{alt}</figcaption>}
    </figure>
  ),
}

export { customComponents as components }