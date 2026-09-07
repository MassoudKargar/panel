export const siteConfig = {
  name: 'Masoud Kargar',
  title: 'Software Engineer • AI Engineering • Distributed Systems',
  description: 'Personal website of Masoud Kargar — Software Engineer building systems at the intersection of Code & AI. Backend, distributed systems, AI engineering, technical writing.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  avatar: '/avatar.png',
  location: 'Iran',
  email: 'masoud@example.com',
  social: {
    github: 'https://github.com/MassoudKargar',
    linkedin: 'https://www.linkedin.com/in/maoudkargar/',
    youtube: 'https://www.youtube.com/@MasoudKargar_Tech',
    telegram: 'https://t.me/masoud_kargar',
    twitter: '',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ],
  currentlyExploring: [
    'AI Agents & Multi-Agent Systems',
    'LLM Infrastructure & Serving',
    'Model Context Protocol (MCP)',
    'AI Engineering & RAG Systems',
    'Distributed Systems & High-Performance Backends',
    'Event-Driven Architecture with Kafka',
  ],
  hero: {
    headline: 'Software Engineer building systems at the intersection of Code & AI.',
    subtext: 'This is my personal space for engineering, AI, experiments, projects, and technical writing.',
    primaryCta: { label: 'Read the Blog', href: '/blog' },
    secondaryCta: { label: 'View Projects', href: '/projects' },
  },
  about: {
    who: 'Software Engineer with 8+ years building scalable backend systems, distributed architectures, and AI-powered applications.',
    what: 'I design and build high-throughput systems, event-driven architectures, and AI agent frameworks. Currently focused on the intersection of traditional backend engineering and modern AI.',
    now: 'Exploring multi-agent systems, LLM serving infrastructure, and the Model Context Protocol ecosystem.',
    coreTech: ['.NET', 'C#', 'Go', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes', 'Docker', 'MCP', 'LLMs'],
  },
  skills: {
    Backend: ['C#', '.NET', 'ASP.NET Core', 'REST APIs', 'gRPC'],
    Architecture: ['Microservices', 'DDD', 'CQRS', 'Clean Architecture', 'Event Sourcing'],
    Data: ['SQL Server', 'PostgreSQL', 'Redis', 'Elasticsearch', 'ClickHouse'],
    Messaging: ['RabbitMQ', 'Kafka', 'NATS'],
    Infrastructure: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'Kubernetes', 'Terraform'],
    AI: ['LLMs', 'AI Agents', 'MCP', 'RAG', 'AI Engineering', 'Vector Databases'],
  },
  cta: {
    headline: "Let's build something interesting.",
    subtext: 'Open to collaborations, consulting, and interesting problems.',
  },
}

export type SiteConfig = typeof siteConfig