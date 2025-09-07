/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable SWC minification for better performance
    styledComponents: true,
  },
  
  // Enable output standalone for better deployment
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // Compression and caching
  compress: true,
  
  // Enable power optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
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

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
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
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }
        ],
      },
      // Cache static assets
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
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
  
  // Experimental features for better performance
  experimental: {
    // Enable modern CSS optimization
    optimizeCss: true,
    // Enable serverless target optimizations
    serverMinification: true,
    // Optimize server components
    serverComponentsExternalPackages: ['web-vitals'],
    // Enable turbo mode for faster builds
    turbo: {
      rules: {
        // Optimize SVG loading
        '*.svg': ['@svgr/webpack'],
      },
    },
  },

  // Output configuration for static export (if needed)
  trailingSlash: false,
  
  // Advanced webpack optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations
    if (!dev) {
      // Tree shaking optimizations
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        // Advanced code splitting
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Framework chunks (React, Next.js core)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Animation libraries chunk
            animations: {
              test: /[\\/]node_modules[\\/](framer-motion|lottie-react|@lottiefiles)[\\/]/,
              name: 'animations',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            // UI libraries chunk
            ui: {
              test: /[\\/]node_modules[\\/](lucide-react|@tanstack|zustand|class-variance-authority|clsx|tailwind-merge)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Large vendor chunks
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              minSize: 20000,
              maxSize: 200000,
            },
            // Common app chunks
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
              reuseExistingChunk: true,
              minSize: 10000,
            },
            // Default chunk
            default: {
              minChunks: 2,
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Bundle analyzer in production builds when ANALYZE=true
      if (process.env.ANALYZE === 'true') {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }));
      }
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Optimize lodash imports
      'lodash': 'lodash-es',
      // Keep default framer-motion import (dist path not exported)
      // 'framer-motion': 'framer-motion',
    };

    // Tree shaking optimizations
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/,
      sideEffects: false,
    });

    // Add performance hints
    config.performance = {
      ...config.performance,
      maxAssetSize: 250000, // 250KB
      maxEntrypointSize: 400000, // 400KB
    };
    
    return config;
  },
};

module.exports = nextConfig;