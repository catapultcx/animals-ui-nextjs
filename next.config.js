/** @type {import('next').NextConfig} */


const path = require('path')

console.log('api url', process.env.API_URL);

const rewrites = () => {
  return [
    {
      source: "/api-cats/cats",
      destination: `${process.env.API_URL}/cats`,
    },
    {
      source: "/api-cats/cats/:id",
      destination: `${process.env.API_URL}/cats/:id`,
    },
  ];
};

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  rewrites
}

module.exports = nextConfig
