/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@susan/contracts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.susansparesort.com',
      },
      {
        protocol: 'https',
        hostname: 'dksw6vf0i66fe.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const scriptPolicy = isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptPolicy,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://images.unsplash.com https://www.susansparesort.com https://dksw6vf0i66fe.cloudfront.net https://ik.imagekit.io http://localhost:3001",
              "media-src 'self' https://ik.imagekit.io",
              "connect-src 'self' http://localhost:3001 http://localhost:4000",
              "frame-src 'self' https://www.google.com https://maps.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/stay',
        destination: '/rooms',
        permanent: true,
      },
      {
        source: '/stay/:slug',
        destination: '/rooms/:slug',
        permanent: true,
      },
      {
        source: '/weddings',
        destination: '/wedding',
        permanent: true,
      },
      {
        source: '/weddings/:slug',
        destination: '/wedding/:slug',
        permanent: true,
      },
      {
        source: '/news-and-event',
        destination: '/wedding',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
