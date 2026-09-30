/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  outputFileTracingRoot: projectRoot,

  // Environment variables
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // ✅ PERFORMANCE: Enable advanced optimization features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@heroicons/react", "lucide-react", "react-icons"],
  },

  // ✅ PERFORMANCE: Optimized image configuration
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000,
  remotePatterns: [
    {
      protocol: "http",
      hostname: "blog-page-panel.onrender.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "imgur.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "i.imgur.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "plus.unsplash.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "img.icons8.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "picsum.photos",
      pathname: "/**",
    },
  ],
},

  // ✅ PERFORMANCE: Compiler optimizations
  compiler: {
    ...(process.env.NODE_ENV === "production"
      ? { removeConsole: { exclude: ["error", "warn"] } }
      : {}),
  },

  // ✅ PERFORMANCE: Enable compression and hide X-Powered-By header
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // ✅ PERFORMANCE: Headers for optimal caching and security
  async headers() {
    const headers = [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|gif|png|svg|webp|avif|ico|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        // Keep preview / staging / old Vercel deployments out of search results.
        // Applies to any *.vercel.app host; the production custom domain is
        // unaffected. Deliberately a header (not a robots.txt Disallow): a
        // crawler has to be able to fetch the page to see the noindex.
        // For genuinely private environments, also enable Vercel Deployment
        // Protection - authentication is the only real access control.
        source: "/:path*",
        has: [{ type: "host", value: "(.*\\.)?vercel\\.app" }],
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        // Security headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];

    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      headers.push({
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      });
    }

    return headers;
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots.txt",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "dashboard.connectingdotserp.com",
          },
        ],
        destination: "/dashboard",
      },
    ];
  },
}




export default withBundleAnalyzer(nextConfig);
