# Personal Brand Website + Technical Blog

A modern, premium personal website for a software engineer and AI-focused technology creator. Built with Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, and Prisma.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Rendering**: Static Site Generation (SSG)
- **Content**: MDX stored in PostgreSQL, rendered with `next-mdx-remote`
- **Typography**: Tailwind Typography

## Features

- **Landing Page** with Hero, About, Tech Stack, Featured Projects, Featured Posts, Currently Exploring, and CTA sections
- **Blog** with SSG-generated post pages, tag filtering, table of contents, related posts, prev/next navigation, and social sharing
- **Projects** showcase with detail pages
- **SEO** with sitemap, robots.txt, RSS feed, Open Graph, Twitter cards, and JSON-LD structured data
- **Dark/Light/System theme** with `next-themes`
- **Responsive design** for mobile, tablet, desktop, and large screens
- **Performance optimized** with Server Components by default

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)

### Installation

```bash
# Clone the repository
cd personal-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL="postgresql://user:password@localhost:5432/personal_site?schema=public"
# NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Database Setup

```bash
# Run migrations
npm run db:migrate

# Seed the database with sample content
npm run db:seed

# (Optional) Open Prisma Studio to explore data
npm run db:studio
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
personal-site/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script with sample data
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── blog/          # Blog pages (index + [slug])
│   │   ├── projects/      # Projects pages (index + [slug])
│   │   ├── rss.xml/       # RSS feed
│   │   ├── sitemap.ts     # Sitemap generation
│   │   ├── robots.ts      # Robots.txt
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   ├── providers.tsx  # Theme provider
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, ThemeToggle
│   │   ├── home/          # Landing page sections
│   │   ├── blog/          # Blog components
│   │   ├── projects/      # Project components
│   │   └── ui/            # Reusable UI primitives
│   ├── config/
│   │   └── site.ts        # Site configuration
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client singleton
│   │   ├── posts.ts       # Post data access
│   │   ├── projects.ts    # Project data access
│   │   ├── mdx.ts         # MDX utilities
│   │   └── utils.ts       # Utility functions
│   └── types/
│       └── index.ts       # TypeScript types
├── .env.example           # Environment template
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Configuration

All site configuration is centralized in `src/config/site.ts`:

- Personal info (name, title, description, avatar, location, email)
- Social links (GitHub, LinkedIn, YouTube, Telegram, X/Twitter)
- Navigation items
- Hero content
- About section content
- Tech stack categories and technologies
- Currently exploring topics
- CTA section content

## Database Schema

### Post
- `id`, `slug` (unique), `title`, `excerpt`, `content` (MDX)
- `coverImage`, `published`, `featured`, `publishedAt`
- `readingTime`, `createdAt`, `updatedAt`
- `tags` (many-to-many with Tag)

### Tag
- `id`, `name`, `slug` (unique)
- `posts` (many-to-many with Post)

### Project
- `id`, `slug` (unique), `title`, `description`, `content` (MDX, optional)
- `image`, `githubUrl`, `liveUrl`, `featured`
- `technologies` (string array)
- `createdAt`, `updatedAt`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO/canonical URLs | Yes |

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production (runs prisma generate)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:seed      # Seed database with sample data
npm run db:migrate   # Run Prisma migrations
npm run db:studio    # Open Prisma Studio
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL` (use a managed PostgreSQL like Neon, Supabase, or Railway)
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Output directory: `.next`
4. Add environment variables

### Cloudflare Pages

1. Connect repository
2. Build command: `npm run build`
3. Build output directory: `.next`
4. Add environment variables
5. Note: Requires `@cloudflare/next-on-pages` adapter for full compatibility

## Content Management

Content is stored in PostgreSQL. To add/edit posts or projects:

1. **Direct database** — Use Prisma Studio (`npm run db:studio`) or SQL
2. **Future admin UI** — Can be built at `/admin` with authentication
3. **Headless CMS** — Replace Prisma data access with CMS API calls

### Adding a Blog Post

```sql
-- Or use Prisma Studio / future admin UI
INSERT INTO posts (slug, title, excerpt, content, cover_image, published, featured, published_at, reading_time)
VALUES ('my-new-post', 'My New Post', 'A short excerpt...', '# My New Post\n\nContent in **MDX**...', null, true, false, NOW(), 5);

-- Associate tags
INSERT INTO _PostToTag (A, B) VALUES ((SELECT id FROM posts WHERE slug='my-new-post'), (SELECT id FROM tags WHERE slug='ai'));
```

**Note**: Since this uses SSG, any content changes require a new build/deployment. For real-time updates without rebuilds, implement ISR (Incremental Static Regeneration) by adding `export const revalidate = 3600` to page components and configuring webhook revalidation.

## Customization

### Styling

- Colors: Edit CSS variables in `src/app/globals.css`
- Tailwind: Modify `tailwind.config.ts`
- Typography: Customize `Prose` component in `src/components/ui/Prose.tsx`

### Fonts

Currently uses Geist (sans) and Geist Mono from `next/font/google`. Change in `src/app/layout.tsx`.

## License

MIT License — feel free to use this as a template for your own personal site.

## Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [lucide-react](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)