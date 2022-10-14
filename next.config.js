/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "api.ts"],
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "picsum.photos", "images.booklooker.de"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
