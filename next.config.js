/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 14
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'easy-peasy.ai',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'istockphoto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'deepdreamgenerator.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        pathname: '/**',
      }
    ]
  }
};

module.exports = nextConfig;