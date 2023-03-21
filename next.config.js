/** @type {import('next').NextConfig} */


const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  }
}

module.exports = nextConfig

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/1/:path*',
        destination: `${process.env.API_URL}/:path*`
      }
    ]
  }
}

