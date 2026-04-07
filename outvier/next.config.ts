import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel optimizations
  poweredByHeader: false,
  
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Image optimization for Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
