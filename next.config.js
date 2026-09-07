/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig