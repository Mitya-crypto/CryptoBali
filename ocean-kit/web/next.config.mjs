// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true, 
  outputFileTracingRoot: path.resolve(__dirname, '..'),
};

module.exports = nextConfig;
