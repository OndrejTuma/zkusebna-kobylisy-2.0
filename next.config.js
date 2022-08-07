/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([])

module.exports = withTM({
  reactStrictMode: true,
  experimental: { esmExternals: true },
  typescript: {
    ignoreBuildErrors: true,
  }
})