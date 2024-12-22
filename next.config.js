/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['loremflickr.com'],
  }
};

module.exports = nextConfig;
