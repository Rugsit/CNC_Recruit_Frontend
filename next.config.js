const { p } = require('framer-motion/client');
const { redirect } = require('next/dist/server/api-utils');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  images: {
    domains: ['s3.cnc.cs.sci.ku.ac.th'],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    dontDelete: 'this',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
