const { p } = require('framer-motion/client');
const { redirect } = require('next/dist/server/api-utils');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects(){ 
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }];
  }
};

module.exports = nextConfig;
