/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@toptal/picasso'])

module.exports = withTM({
  reactStrictMode: true,
  experimental: { esmExternals: true },
})