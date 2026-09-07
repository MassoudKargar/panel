import { getAllPosts } from '@/lib/posts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  const posts = await getAllPosts()

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Alex Chen — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Technical articles on backend engineering, AI, distributed systems, and more.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js</generator>
    <managingEditor>alex@example.com (Alex Chen)</managingEditor>
    <webMaster>alex@example.com (Alex Chen)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Alex Chen</copyright>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/icon.png</url>
      <title>Alex Chen — Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${posts
      .filter((post) => post.published)
      .map((post) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`
        const pubDate = post.publishedAt ? post.publishedAt.toUTCString() : new Date().toUTCString()
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.excerpt}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>alex@example.com (Alex Chen)</author>
      ${post.tags.map((tag) => `<category><![CDATA[${tag.name}]]></category>`).join('')}
    </item>`
      })
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}