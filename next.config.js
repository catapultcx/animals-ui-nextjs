/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
