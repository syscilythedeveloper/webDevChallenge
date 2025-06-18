// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'], // ✅ allow this external domain
  },
};

module.exports = nextConfig;
