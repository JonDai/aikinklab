/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Compression and caching
  compress: true,
  
  // Image optimization configuration
  images: {
    // Enable modern formats for better compression
    formats: ['image/webp', 'image/avif'],
    
    // Remote patterns for external images
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
    ],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          }
        ],
      },
    ];
  },

  // Font optimization
  optimizeFonts: true,
  
  // Bundle analyzer (enable when needed)
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),
  
  // Experimental features for better performance (disabled for build stability)
  // experimental: {
  //   optimizeCss: true,
  // },

  // Output configuration for static export (if needed)
  trailingSlash: false,
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Tree shaking optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;